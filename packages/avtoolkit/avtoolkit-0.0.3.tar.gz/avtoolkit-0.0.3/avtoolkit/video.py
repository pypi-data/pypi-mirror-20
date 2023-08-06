"""
avtoolkit.video

Video functions for the AV Toolkit.
"""

from __future__ import print_function
import os
import locale
import json
from subprocess import check_call, check_output

from .util import tempdir, chainable


FFMPEG_BIN = "ffmpeg"
FFPROBE_BIN = "ffprobe"
DEV_NULL = open(os.devnull, "w")
ENCODING = locale.getpreferredencoding()


def check_output_decoded(*args, **kwargs):
    """ Call check_output and decode the resulting bytes. """
    return check_output(*args, **kwargs).decode(ENCODING)


def ffmpeg(args, capture_stdout=False):
    """ Call ffmpeg and redirect stderr to /dev/null """
    func = check_output_decoded if capture_stdout else check_call
    # return func([FFMPEG_BIN]+args, stderr=DEV_NULL)
    return func([FFMPEG_BIN, "-y"]+args)


def ffprobe(args):
    """ Call ffprobe and redirect stderr to /dev/null """
    return check_output_decoded([FFPROBE_BIN]+args, stderr=DEV_NULL)


class Video(object):
    """
    Represents a single video.
    """
    def __init__(self, source):
        if not os.path.exists(source):
            raise IOError("File does not exist at %r" % source)
        self.source = os.path.abspath(source)
        self.dirname = os.path.dirname(self.source)
        _, self.ext = os.path.splitext(self.source)
        self.intermediate_file = None
        self._data = None
        self._frame_paths = []

    @property
    def data(self):
        """
        Uses ffprobe to gather data about the video. Uses stored data if available.
        """
        if self._data is None:
            self._data = self.probe(self.source)
        return self._data

    @staticmethod
    def probe(video_path):
        """
        Get the details of the video.
        """
        args = [
            "-print_format", "json",
            "-show_streams",
            video_path
        ]
        return json.loads(ffprobe(args))

    @staticmethod
    def from_images(images_path, fps, dest_path):
        """
        Create a video from `images_path` at `fps` frames per second.

        :returns: Video
        """
        args = [
            "-r", str(fps),
            "-i", images_path,
            dest_path
        ]
        print("Running ffmpeg command: %r" % " ".join(args))
        ffmpeg(args)
        return Video(dest_path)

    def extract_audio(self, output_path):
        """
        Extracts the audio stream(s) from the video.
        """
        args = [
            "-i", self.source,
            "-vn",
            "-acodec", "copy",
            output_path
        ]
        ffmpeg(args)

    def to_images(self, dest_dir=None, img_format="png"):
        """
        Convert this video to individual frame images.
        """
        name, _ = os.path.splitext(self.source)
        output_path = "%s-%%03d.%s" % (name, img_format)
        if dest_dir is not None:
            output_path = os.path.join(dest_dir, os.path.basename(output_path))
        args = [
            "-i", self.source,
            output_path
        ]
        print("Running command: %r" % " ".join(args))
        ffmpeg(args)
        self._frame_paths = [os.path.join(dest_dir, x) for x in sorted(os.listdir(dest_dir))]
        return self._frame_paths

    @chainable
    def reencode(self, output_path=None):
        """
        Simply reencode the video to the specified output_path.
        """
        ffmpeg([
            "-i", self.source,
            output_path
        ])
        return Video(output_path)

    def split(self, seconds, beginning_path, end_path):
        """
        Split a video into two parts at `seconds`.
        """
        ffmpeg([
            "-i", self.source,
            "-t", str(seconds),
            beginning_path,
            "-ss", str(seconds),
            end_path
        ])
        return (Video(beginning_path), Video(end_path))

    @chainable
    def overlay(self, vid, start_seconds, overlay_duration=None, position=(0, 0), output_path=None):
        """
        Overlay the contents of `vid` onto this video starting at `start_seconds`.
        """
        try:
            duration = overlay_duration or float(vid.data["streams"][0]["duration"])
        except KeyError:
            raise AttributeError("Must provide overlay_duration if the overlay is an image.")

        ffmpeg([
            "-i", self.source,
            "-i", vid.source,
            "-filter_complex",
            "overlay=%s:enable='between(t,%f,%f)'" % (
                ":".join(map(str, position)), start_seconds, start_seconds+duration
            ),
            output_path
        ])
        return Video(output_path)

    @tempdir
    @chainable
    def concatenate(self, tmpdir, before=None, after=None, reencode=True, output_path=None):
        """
        Concatenate `before` Videos onto the beginning of this Video and `after` ones onto the end.
        """
        if before is None:
            before = []
        if after is None:
            after = []
        if not (before or after):
            raise ValueError("Must provide videos to concatenate with!")

        timeline = tuple(before) + (self,) + tuple(after)
        filenames = os.path.join(tmpdir, "files.txt")
        with open(filenames, "w") as fdesc:
            fdesc.writelines(["file %s\n" % vid.source for vid in timeline])
        cmd = [
            "-f", "concat",
            "-safe", "0",
            "-i", filenames
        ]
        if not reencode:
            cmd += ["-c", "copy"]
        cmd += [output_path]
        ffmpeg(cmd)
        return Video(output_path)

    @tempdir
    @chainable
    def insert(self, vid, start_seconds, tmpdir, reencode=True, output_path=None):
        """
        Insert the contents of `vid` into this video starting at `start_frame`
        for `limit` frames.
        """
        _, ext = os.path.splitext(self.source)
        a_path = os.path.join(tmpdir, "a%s" % ext)
        b_path = os.path.join(tmpdir, "b%s" % ext)
        part_a, part_b = self.split(start_seconds, a_path, b_path)
        vid.concatenate(
            output_path=output_path, before=(part_a,), after=(part_b,), reencode=reencode)
        return Video(output_path)

    @chainable
    def trim_start(self, seconds, output_path=None):
        """
        Remove `seconds` from the beginning of the video.
        """
        ffmpeg([
            "-ss", str(seconds),
            "-i", self.source,
            output_path
        ])
        return Video(output_path)

    @chainable
    def trim_end(self, seconds, output_path=None):
        """
        Remove `seconds` from the end of the video.
        """
        length = float(self.data["streams"][0]["duration"])
        ffmpeg([
            "-t", str(length-seconds),
            "-i", self.source,
            output_path
        ])
        return Video(output_path)

    @chainable
    def scale(self, new_size, output_path=None):
        """
        Scale this video to `new_size`.
        """
        ffmpeg([
            "-i", self.source,
            "-vf", "scale=%s" % ":".join(map(str, new_size)),
            output_path
        ])
        return Video(output_path)
