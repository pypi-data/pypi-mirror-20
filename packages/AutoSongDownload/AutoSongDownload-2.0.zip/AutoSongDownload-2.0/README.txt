# AutoSongDownload
Download song in just two steps.

###What it does-
"Download song of your choice in audio format in two steps by just entering the name."

###Getting started-
* In song.bat change the path to path of your program.
* In getUrl.py and youtubeAudio.py change path to folder you want your song to download.

###Usage - 5 ways:-
* Run the program and enter the song name.
* From cmd line or run(win+R) enter "song \<song name\>". This is will give you top
    n results(n=10 by deafult).
* From cmd line or run enter "song /<song name>". First result will be automatically downloaded.
* You can just copy the song name and run "song" command from cmd or run. No
    need to paste just copy. Note:-This will automatically download the first result by default. (P.S-You
    can change that too.)
* You can create a keyboard shorcut to shorten the 4th way even more. Just copy the
    the song name and press that Keyboard shortcut. And the download will start.

#####Note:- Optionally if you don't want the song to autoplay, you can append the song name with '/'.

######eg. "song /count on me/" will download this song without giving options but will not play it.

I have made this on windows and python 2.7. It may require some tweaks to get it working on other OS.

If the file is already downloaded it will just play it(only if its not appended with '/'.)
