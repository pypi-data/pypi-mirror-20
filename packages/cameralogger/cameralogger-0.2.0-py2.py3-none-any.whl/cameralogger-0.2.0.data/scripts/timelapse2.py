#!python

# timelapse - create timelapses from camera images by calling FFmpeg.
# Copyright (C) 2017  Steve Marple.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import argparse
import datetime
from fractions import Fraction
import logging
import numpy as np
import os
from PIL import Image
import six
import subprocess
import time
from cameralogger import read_config_file, get_config_option, MovieTasks
from cameralogger.ffmpeg import FFmpeg


__author__ = 'Steve Marple'
__version__ = '0.1.1'
__license__ = 'MIT'


logger = logging.getLogger(__name__)


if __name__ == '__main__':
    default_config_file = os.path.join(os.path.sep, 'etc', 'camera.ini')
    parser = \
        argparse.ArgumentParser(description='')

    parser.add_argument('-c', '--config-file',
                        default=default_config_file,
                        help='Configuration file')
    parser.add_argument('-e', '--end-time',
                        required=True,
                        help='End time for time lapse')
    parser.add_argument('-j', '--jitter',
                        type=int,
                        default=0,
                        help='Accept jitter',
                        metavar='SECONDS')
    parser.add_argument('--log-level',
                        choices=['debug', 'info', 'warning',
                                 'error', 'critical'],
                        default='info',
                        help='Control how much detail is printed',
                        metavar='LEVEL')
    parser.add_argument('-o', '--output',
                        required=True,
                        help='Output filename')
    parser.add_argument('-r', '--output-frame-rate',
                        type=float,
                        help='Input frame rate',
                        metavar='FPS')
    parser.add_argument('--size',
                        help='Video size (WxH or percentage')
    parser.add_argument('-s', '--start-time',
                        required=True,
                        help='Start time for time lapse')
    parser.add_argument('--step',
                        default=1,
                        type=int,
                        help='Time step between images',
                        metavar='SECONDS')

    # Offer multiple methods to set the input frame rate
    ifr_group = parser.add_mutually_exclusive_group()
    ifr_group.add_argument('-d', '--duration',
                           type=float,
                           help='Set output duration for timelapse',
                           metavar='SECONDS')
    ifr_group.add_argument('-i', '--input-frame-rate',
                           type=float,
                           help='Input frame rate',
                           metavar='FPS')
    ifr_group.add_argument('--speed-up',
                           type=float,
                           help='Playback speed as ratio to real time',
                           metavar='FPS')

    args = parser.parse_args()

    logging.basicConfig(level=getattr(logging, args.log_level.upper()))

    start_time = np.datetime64(args.start_time, 's')
    end_time = np.datetime64(args.end_time, 's')

    kwargs = {}
    if args.input_frame_rate is not None:
        kwargs['ifr'] = args.input_frame_rate
    elif args.speed_up is not None:
        kwargs['speed_up'] = args.speed_up
    else:
        kwargs['duration'] = args.duration

    config = read_config_file(args.config_file)
    size = [960, 720]
    ifr = 60
    ofr = Fraction(60, 1)
    ffmpeg = FFmpeg(args.output, size, ifr, ofr)

    schedule_info = {
        'StartTime': np.datetime64(args.start_time, 's').astype(datetime.datetime),
        'EndTime': np.datetime64(args.end_time, 's').astype(datetime.datetime),
        'Step': args.step,
    }

    tasks = MovieTasks(ffmpeg, config, 'movie', schedule_info)
    task_list = get_config_option(config, 'movie', 'tasks', default='')
    tasks.run_tasks(task_list.split())