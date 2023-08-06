import datetime
import logging
import random
import sys

from mopidy import core

import pykka

logger = logging.getLogger(__name__)

SECTIONS = 3


class AutoFrontend(pykka.ThreadingActor, core.CoreListener):
    def __init__(self, config, core):
        super(AutoFrontend, self).__init__()
        self.config = config
        self.core = core

        # One history per section
        self.history = {1: [], 2: [], 3: []}
        print(self.history)

        self.base_path = self.config['auto']['base_path']
        self.max_tracks = self.config['auto']['max_tracks']
        if self.max_tracks <= 0:
            self.max_tracks = sys.maxsize

        logger.info("Auto base path: %s, max tracks: %d", self.base_path, self.max_tracks)

        self.sections = []
        section = 0

        exists = "s{}_folder".format(section) in self.config['auto']
        while exists:
            self.sections.append({
                "hour": self.config['auto']["s{}_hour".format(section)],
                "minute": self.config['auto']["s{}_minute".format(section)],
                "folder": self.config['auto']["s{}_folder".format(section)],
                "max_volume": self.config['auto']["s{}_max_volume".format(section)]
            })
            section += 1
            exists = "s{}_folder".format(section) in self.config['auto']

        if not self.sections:
            logger.error('Could not find any auto sections')
        else:
            logger.info('Found the following auto sections:')
            for section in self.sections:
                logger.info("Start: %02d:%02d Folder: %s, Max Volume: %d%%",
                            section['hour'],
                            section['minute'],
                            section['folder'],
                            section['max_volume'])

    # Mopidy events
    def tracklist_changed(self):
        if self.core.tracklist.get_length().get() == 0:
            self.play_random_album()

    def track_playback_ended(self, tl_track, time_position):
        if self.core.tracklist.index(tl_track).get() == self.core.tracklist.get_length().get() - 1:
            self.play_random_album()

    # Functions
    def play_random_album(self):
        section_index, section = self.get_section_by_time()
        logger.info("Auto play of random album, folder: %s", section['folder'])
        if self.core.mixer.get_volume().get() > section['max_volume']:
            self.core.mixer.set_volume(section['max_volume'])

        uri = self.base_path + section['folder']
        tracks = self.get_random_album(uri, section_index)
        self.play_uris(tracks)

    def get_section_by_time(self):
        now = datetime.datetime.now()

        for section in reversed(self.sections):
            if now.hour >= section['hour'] and now.minute >= section['minute']:
                return self.sections.index(section), section

        return None

    def get_random_album(self, uri, section_index):
        track_uris = []
        logger.info("Navigating file structure, URI: %s", uri)

        refs = self.core.library.browse(uri).get()

        for ref in refs:
            if ref.type == 'track':
                track_uris.append(ref.uri)
                if len(track_uris) >= self.max_tracks:
                    logger.info("Reached maximum tracks from same folder: %d", self.max_tracks)
                    break

        if len(track_uris) > 0:
            print(self.history, section_index)
            self.history[section_index].append(uri)
            return track_uris

        refs = self.get_unplayed_directories(refs, section_index)
        rand_idx = random.randint(0, len(refs) - 1)
        return self.get_random_album(refs[rand_idx].uri, section_index)

    def play_uris(self, uris):
        logger.info("Found %d tracks", len(uris))

        index = self.core.tracklist.get_length().get()
        self.core.tracklist.add(uris=uris)
        self.core.playback.play(tlid=index + 1)

    def get_unplayed_directories(self, refs, section_index):
        unplayed = [x for x in refs if x.uri not in self.history]

        # If all albums have been played:
        #  Return list containing all except the last played
        #  Clear history
        if len(unplayed) == 0:
            logger.info("Unique albums depleted. Clearing history")
            unplayed = [x for x in refs if x.uri != self.history[-1]]
            self.history[section_index] = []

        return unplayed
