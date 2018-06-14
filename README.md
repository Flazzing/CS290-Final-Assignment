# CS 290 Final Project

Links:
*  `https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API`
*  `https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API`



**Interface References: https://clyp.it/**

Library:    
*  `mongodb`
* `handlebars`

Site will be able to record audio from user's mic input to store onto a database to be re-accessed later.


HTML lacking:

*  `Popup page for signup button`
*  `Popupp page for upload button`
*  `Popupp page for signin button`

Feedback:
There probably doesn't need to be two titles for the website.  The second one says Echofly instead of Echofy (FIXED).  There's a lot of negative space around creators and clips(FIXED). To fix this, the clips right margin should be aligned under the creators so they match.  Other than that, it looks really good.

index.js:
Filled in some js using project 5 functions.  Need modals to finish.

index.html:
Changed some html titles.  We may need to give separate class name to the usernames in the clips container because if the modal searches text values, the images' html may be picked up by it.  


modal work:
I created a basic modal layout with a player that will be used to load the most currently recorded clip. I've sourced that player from jplayer.org

Files from jplayer.org that can be moved to their own folder within public:
*  `jquery.jplayer.min.js`
*  `jquery.min.js`
*  `All other side files labeled with jplayer`

Modal lacking:

*  `javascript for adding clips that that player and website`
*  `clearing of information when closed` (FIXED)
*  `adding charachter limit to title and author entires`(not a priority yet)

index.js:
added getUserMedia() function and an event listener for recordClip(), but site doesn't ask for access to microphone for some reason and clicking record doesn't do anything.  I added clearing of text values when adding text in the modal.  Also, tried to fix modal background but not sure why it isn't being displayed.  It may have something to do with the ordering of the CSS because I vaguely remember Hess mentioning modal backdrop wouldn't work if it is ordered incorrectly.  

app.js:
created app.js to write js for recording audio from modal.  The clip should then load into the player, but I'm not sure what all of that jquery code is doing.  I tried moving the jplayer files into a separate folder and adding scripts for them in home.handlebars, but they all disappeared from pages so I moved them back.  Maybe they need to be labeled as a dependency in package.json. I'm not sure what to do with this jquery code.

The recorder is recognized now and should ask for permission to use a mic.  Record button records, but we just need somewhere to load the clip and play it.  
