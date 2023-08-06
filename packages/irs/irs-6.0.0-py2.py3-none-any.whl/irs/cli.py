# Arguments
import argparse

# System
import sys
import os

# Powered by:
from .ripper import Ripper
from .utils import console

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-a", "--artist", dest="artist", help="Specify artist name. Must be used with -s/--song")
    parser.add_argument("-s", "--song",   dest="song",   help="Specify song name. Must be used with -a/--artist")
    
    parser.add_argument("-A", "--album",    dest="album", help="Specify album name")
    
    parser.add_argument("-u", "--username", dest="username", help="Specify username. Must be used with -p/--playlist")
    parser.add_argument("-p", "--playlist", dest="playlist", help="Specify playlist name. Must be used with -u/--username")
    
    args = parser.parse_args()
    
    if args.artist and args.song:
        Ripper().song(args.song, args.artist)
    elif args.album:
        Ripper().spotify_list("album", args.album)
    elif args.username and args.playlist:
        Ripper().spotify_list("playlist", args.playlist, args.username)
    else:
        console(Ripper())

if __name__ == "__main__":
    main()