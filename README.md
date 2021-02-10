#### PROJECT DESCRIPTION #####

The project consists of a single script "player.js".
On DOM load of www.google.com the script loads the stTipCss and guideJson.
On successfull network response the script parses the response and creates tooltip for each step.
Finally it initializes the next and cross CTA's present on the tooltip.


#### SETUP INSTRUCTIONS ####

We need to download two chrome extensions to run this script
1. Run Javascript --
    URL : https://chrome.google.com/webstore/detail/run-javascript/lmilalhkkdhfieeienjbiicclobibjao
    Usage : It helps us in running player.js on load of www.google.com

2. Allow CORS --
    URL : https://mybrowseraddon.com/access-control-allow-origin.html
    Usage : It helps us in remove any CORS issue related to css or guideJson load

Once these extensions are downloaded, we just need to paste the code of player.js in Run Javascript and click on Save & Run.
The tooltip will appear on the page.
The same will be true on page refresh.

![runjs](https://user-images.githubusercontent.com/20390397/107505002-15e3a500-6bc2-11eb-98d4-62f9d3b8f6ed.png)
