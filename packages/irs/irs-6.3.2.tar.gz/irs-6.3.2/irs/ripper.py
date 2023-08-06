# Powered by:
import youtube_dl
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# System
import sys
import os
import glob

# Parsing
from bs4 import BeautifulSoup
if sys.version_info[0] >= 3:
    from urllib.parse import urlencode
    from urllib.request import urlopen
elif sys.version_info[0] < 3:
    from urllib import urlencode
    from urllib import urlopen
else:
    print ("Must be using Python 2 or 3")
    sys.exit(1)

# Local utilities
from .utils import *
from .metadata import *

class Ripper:
    def __init__(self, args={}):
        self.args = args
        self.locations = []
        self.type = None
        try:
            CLIENT_ID, CLIENT_SECRET = parse_spotify_creds(self)
            client_credentials_manager = SpotifyClientCredentials(CLIENT_ID, CLIENT_SECRET)
            self.spotify = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
            self.authorized = True
        except Exception as e:
            self.spotify = spotipy.Spotify()
            self.authorized = False

    def post_processing(self, locations):
        post_processors = self.args.get("post_processors")
        if post_processors:
            if parse_directory(self) != None:
                for index, loc in enumerate(locations):
                    new_file_name = parse_directory(self) + "/" + loc
                    if not os.path.exists(parse_directory(self)):
                        os.makedirs(parse_directory(self))
                    os.rename(loc, new_file_name)
                    locations[index] = new_file_name
            # I'd just go on believing that code this terrible doesn't exist.
            # You can just close your eyes and scroll by. I'd encourage it.
            # It's okay if you need to cry though.
            # The rest of the code is here for you.
            # It's like loving someone,
            # Everyone has some flaws, but you still appreciate and embrace
            # those flaws for being exclusive to them.
            # And if those flaws are really enough to turn you off of them, then
            # you *probably* don't really want to be with them anyways.
            # Either way, it's up to you.
            if parse_organize(self):
                if self.type in ("album", "song"):
                    for index, loc in enumerate(locations):
                        mp3 = Metadata(loc)
                        new_loc = ""
                        if len(loc.split("/")) >= 2:
                            new_loc = "/".join(loc.split("/")[0:-1]) + "/"
                            file_name = loc.split("/")[-1]
                        else:
                            file_name = loc
                        artist, album = mp3.read_tag("artist")[0], mp3.read_tag("album")
                        new_loc += blank(artist, False)
                        if album != []:
                            new_loc += "/" + blank(album[0], False)
                        if not os.path.exists(new_loc):
                            os.makedirs(new_loc)
                        new_loc += "/" + file_name
                        loc = loc.replace("//", "/")
                        new_loc = new_loc.replace("//", "/")
                        os.rename(loc, new_loc)
                        locations[index] = new_loc
                        print (new_loc)
                elif self.type == "playlist":
                    for index, loc in enumerate(locations):
                        new_loc = ""
                        if len(loc.split("/")) > 1:
                            new_loc = "/".join(loc.split("/")[0:-1])
                            file_name = loc.split("/")[-1]
                        else:
                            file_name = loc
                        new_loc += blank(self.playlist_title, False)
                        if not os.path.exists(new_loc):
                            os.makedirs(new_loc)
                        loc = loc.replace("//", "/")
                        new_loc = (new_loc  + "/" + file_name).replace("//", "/")
                        os.rename(loc, new_loc)

        return locations

    def find_yt_url(self, song=None, artist=None, additional_search=None):
        if additional_search == None:
            additional_search = parse_search_terms(self)
        try:
            if not song:    song = self.args["song_title"]
            if not artist:  artist = self.args["artist"]
        except KeyError:
            raise ValueError("Must specify song_title/artist in `args` with init, or in method arguments.")

        print ("Finding Youtube Link ...")

        search_terms = song + " " + artist + " " + additional_search
        query_string = urlencode({"search_query" : (search_terms)})
        link = "http://www.youtube.com/results?" + query_string

        html_content = urlopen(link).read()
        soup = BeautifulSoup(html_content, 'html.parser')#.prettify

        def find_link(link):
            try:
                if "yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink spf-link" in str(" ".join(link["class"])):
                    if not "&list=" in link["href"]:
                        return link
            except KeyError:
                pass

        results = list(filter(None, (map(find_link, soup.find_all("a")))))

        garbage_phrases = "cover  album  live  clean  rare version".split("  ")

        self.code = None
        for link in results:
            if blank_include(link["title"], song) and blank_include(link["title"], artist):
                if check_garbage_phrases: continue
                self.code = link
                break

        if self.code == None:
            for link in results:
                if check_garbage_phrases: continue
                if individual_word_match(song, link["title"]) >= 0.8 and blank_include(link["title"], artist):
                    self.code = link
                    break

        if self.code == None:
            if additional_search == "lyrics":
                return self.find_yt_url(song, artist, "")
            else:
                self.code = results[0]

        return ("https://youtube.com" + self.code["href"], self.code["title"])

    def album(self, title): # Alias for `spotify_list("album", ...)`
        return self.spotify_list("album", title)

    def playlist(self, title, username): # Alias for `spotify_list("playlist", ...)`
        return self.spotify_list("playlist", title, username)

    def spotify_list(self, type=None, title=None, username=None):
        try:
            if not type:    type = self.args["type"]
            if not title:   title = self.args["list_title"]
            if not username and type == "playlist":
                username = self.args["username"]
        except KeyError:
            raise ValueError("Must specify type/title/username in `args` with init, or in method arguments.")

        if not self.type:
            self.type = type

        if type == "album":
            search = title
            if "artist" in self.args:
                search += " " + self.args["artist"]
            list_of_lists = self.spotify.search(q=search, type="album")["albums"]["items"]
        elif type == "playlist":
            list_of_lists = self.spotify.user_playlists(username)["items"]

        if len(list_of_lists) > 0:
            the_list = None
            for list_ in list_of_lists:
                if blank_include(list_["name"], title):
                    if "artist" in self.args:
                        if blank_include(list_["artists"][0]["name"], self.args["artist"]):
                            the_list = list_
                            break
                    else:
                        if type == "album":
                            the_list = self.spotify.album(list_["uri"])
                        else:
                            the_list = self.spotify.user_playlist(list_["owner"]["id"], list_["uri"])
                            the_list["artists"] = [{"name": username}]
                        break
            if the_list != None:
                clear_line()
                print (type.title() + ': "%s" by "%s"' % (the_list["name"], the_list["artists"][0]["name"]))
                compilation = ""
                if type == "album":
                    tmp_artists = []
                    for track in the_list["tracks"]["items"]:
                        tmp_artists.append(track["artists"][0]["name"])
                    tmp_artists = list(set(tmp_artists))
                    if len(tmp_artists) > 1:
                        compilation = "1"

                tracks = []
                file_prefix = ""

                for track in the_list["tracks"]["items"]:
                    if type == "playlist":
                        self.playlist_title = the_list["name"] # For post-processors

                        file_prefix = str(len(tracks) + 1) + " - "
                        track = track["track"]
                        album = self.spotify.album(track["album"]["uri"])
                    elif type == "album":
                        file_prefix = str(track["track_number"]) + " - "
                        track = self.spotify.track(track["uri"])
                        album = the_list

                    data = {
                        "name":          track["name"],
                        "artist":        track["artists"][0]["name"],
                        "album":         album["name"],
                        "genre":         parse_genre(self.spotify.artist(track["artists"][0]["uri"])["genres"]),
                        "track_number":  track["track_number"],
                        "disc_number":   track["disc_number"],
                        "album_art":     album["images"][0]["url"],
                        "compilation":   compilation,
                        "file_prefix":   file_prefix,
                    }

                    tracks.append(data)

                locations = self.list(tracks)
                return locations
                #return self.post_processing(locations)

        print ('Could not find any lists.')
        return False

    def list(self, list_data):
        locations = []
        #with open(".irs-download-log", "w+") as file:
        #    file.write(format_download_log_data(list_data))

        for track in list_data:
            loc = self.song(track["name"], track["artist"], track)

            if loc != False:
                #update_download_log_line_status(track, "downloaded")
                locations.append(loc)

        if self.type in ("album", "playlist"):
            return self.post_processing(locations)

        #os.remove(".irs-download-log")
        return locations

    def parse_song_data(self, song, artist):
        album, track = find_album_and_track(song, artist)
        if album == False:
            return {}

        album = self.spotify.album(album["uri"])
        track = self.spotify.track(track["uri"])
        genre = self.spotify.artist(album["artists"][0]["uri"])["genres"]

        return {
            "name":            track["name"],
            "artist":          track["artists"][0]["name"],
            "album":           album["name"],
            "album_art":       album["images"][0]["url"],
            "genre":           parse_genre(genre),
            "track_number":    track["track_number"],
            "disc_number":     track["disc_number"],

            "compilation": "", # If this method is being called, it's not a compilation
            "file_prefix": ""  # And therefore, won't have a prefix
        }

    def song(self, song, artist, data={}): # Takes data from `parse_song_data`
        if not self.type:
            self.type = "song"

        try:
            if not song:    song = self.args["song_title"]
            if not artist:  artist = self.args["artist"]
        except KeyError:
            raise ValueError("Must specify song_title/artist in `args` with init, or in method arguments.")

        if data == {}:
            data = self.parse_song_data(song, artist)
            if data != {}:
                song = data["name"]
                artist = data["artist"]

        if "file_prefix" not in data:
            data["file_prefix"] = ""

        video_url, video_title = self.find_yt_url(song, artist)

        print ('Downloading "%s" by "%s" ...' % (song, artist))

        file_name = str(data["file_prefix"] + blank(song, False) + ".mp3")

        ydl_opts = {
            'format': 'bestaudio/best',
            #'quiet': True,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'logger': MyLogger(),
            'progress_hooks': [my_hook],
            'output': "tmp_file",
            'prefer-ffmpeg': True,
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])


        for file in glob.glob("./*%s*" % video_url.split("/watch?v=")[-1]):
            os.rename(file, file_name)

        # Ease of Variables (copyright) (patent pending) (git yer filthy hands off)
        # [CENSORED BY THE BAD CODE ACT]
        # *5 Minutes Later*
        # Deprecated. It won't be the next big thing. :(


        m = Metadata(file_name)

        m.add_tag("comment",        'URL: "%s"\nVideo Title: "%s"' % (video_url, video_title))
        if len(data.keys()) > 1:
            m.add_tag("title",          data["name"])
            m.add_tag("artist",         data["artist"])
            m.add_tag("album",          data["album"])
            m.add_tag("genre",          data["genre"])
            m.add_tag("tracknumber",    str(data["track_number"]))
            m.add_tag("discnumber",     str(data["disc_number"]))
            m.add_tag("compilation",    data["compilation"])
            m.add_album_art(            str(data["album_art"]))
        else:
            print ("Could not find metadata.")
            m.add_tag("title",          song)
            m.add_tag("artist",         artist)

        if self.type == "song":
            return self.post_processing([file_name])

        return file_name