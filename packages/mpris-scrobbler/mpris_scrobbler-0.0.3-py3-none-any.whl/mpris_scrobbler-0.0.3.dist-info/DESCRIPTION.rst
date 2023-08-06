# mpris-scrobbler

Scrobbler that can use any MPRIS-enabled media players.

Currently only supports [wilt.fm][1]

## Getting Started

This requires Python 3. I have only tested it on Python 3.6, so far.

* This will **NOT** work in Windows.
* Requires [dbus-python][2]

## Usage
Examples: 

* `python -m mpris_scrobbler` will prompt for everything
* `python -m mpris_scrobbler -u bottitytto -d vlc` will use these settings

```
usage: mpris-scrobbler.py [-h] [-u USERNAME] [-p PASSWORD] [-s SERVICE]
                          [-d DEVICE]

Scrobble from MPRIS-enabled devices

optional arguments:
  -h, --help            show this help message and exit
  -u USERNAME, --username USERNAME
                        Scrobble service username
  -p PASSWORD, --password PASSWORD
                        Scrobble service password
  -s SERVICE, --service SERVICE
                        Scrobble service. Options: wiltfm (default)
  -d DEVICE, --device DEVICE
                        MPRIS device to scrobble from
```

If you'd like to help out with code, visit https://git.mashek.xyz/bottitytto/mpris-scrobbler

Bug reports can be filed at https://git.mashek.xyz/bottitytto/mpris-scrobbler/issues

## Installation

Suggested steps for installation and usage:

* `pip install mpris_scrobbler`
* `mpris_scrobbler`

## Download

Coming soon!

## Notes

Some players, like [Sayonara][5], must start playing a song before they will work with `mpris-scrobbler.`


## Credits
Inspired by [mpd-scrobbler][3] and my work on [grab-song][4]


[1]:https://wilt.fm
[2]:https://pypi.python.org/pypi/dbus-python
[3]:https://github.com/ModalSeoul/mpd-scrobbler
[4]:https://github.com/aFoxNamedMorris/grab-song
[5]:http://sayonara-player.com


