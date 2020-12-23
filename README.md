# Journal to Canvas Slideshow

## WARNING 

If your image's source is from somewhere online, there's a chance there will be a CORS issue, and clicking on the image in the journal won't change the tile due to this error. Take a look at the dev console (F12 on Windows) and see if there's an error like this:  https://i.imgur.com/SBHQPka.png

If so, for now, try saving/downloading the image and placing it in your Foundry data folder somewhere, then in the journal entry, have the image's source link to that file path instead. I'll try to see if I can find a way around this.

# About the Project

This project brings functionality to images and videos in your Foundry journal entries and allows you to create a Display Scene. You can click on journal images and videos, which will change a tile in the Display Scene to match the image in the journal.

!["Demonstration of module"](https://media2.giphy.com/media/24FOKvWRayT3ZQC5sd/giphy.gif)

This is meant to make sharing art with your players while narrating or reading your notes a lot more seamless. It fits well with Theater of the Mind style play. 



## Built With

* JavaScript
* JQuery

# Getting Started

To install this module, go to the Configuration and Setup options in Foundry VTT, click on "Add-on Modules", then "Install Module".

There will be a text box toward the bottom where you can paste this Manifest URL:

https://raw.githubusercontent.com/EvanesceExotica/Journal-To-Canvas-Slideshow/master/module.json

Then click "Install". 

# How to Use


1. Open your game in FoundryVTT and navigate to the "Scenes" tab.

2. At the bottom of this tab, there will be a button that reads "Create or Show Display Scene".
3. Click that button. A new scene will be generated named "Display", with a single tile with a dark background.

!["Demonstration of Create or Show Display Scene button"](https://media4.giphy.com/media/PHOiojIZhG3hyg4uIm/giphy.gif)

4. If you click on this button again while the Display scene already exists, it will activate the Display scene instead of creating a new one. (**Warning**: *Do not* rename this scene, as the script searches for a scene named "Display" specifically. I may try to change this in the future so it keeps track of and searches for the scene's ID instead.)

5. You can  change the scene's background image and add extra tiles for decoration, but 
make sure that the very first tile on the canvas is the tile you wish to display your images. 
6. Open up a journal entry with images (**Note**: This should work with Image Mode journal entries too). You should notice the images highlight in white when you hover over them.
7. Clicking on them will cause the tile in the Display scene to resize/reposition and change to match the image you clicked on.
8. Have fun!

## Videos

This project does support .webm and .mp4 files, however inserting a video into a journal entry requires a different approach than using an image.

1. Check out this page: https://www.w3schools.com/html/html5_video.asp and scroll down a bit to the part that says "Example". 

2. Open up your journal entry, click the edit button, then click the button along the top that looks like this "< >" to access the entry's source code. 

!["Clicking on source code button"](https://i.imgur.com/dUgvvBS.png?1)

3. You can copy and paste the code example shown on the above w3schools site  into the source code, and change the file path in quotations (where it says <source="movie.mp4" type="video/mp4">, change the 'movie.mp4' part to be the file path of your .webm or .mp4 video and the type to the matching type "mp4" or "webm").

!["Placing video element in source code"](https://i.imgur.com/uXnoRxU.png=800x600)

4. You can then click on the video, and it will change the Display tile.

!["Clicking on vid to change tile"](https://media0.giphy.com/media/rF4mjVrm5L6Y4MrmSx/giphy.gif)

# Roadmap

Might add some more configuration options for the sizing of the tile compared to the canvas.

# Code Explanation

The real 'magic' basically surrounds a single tile. Each time I click on an image in the journal entry, the tile's image source is updated with the source changed to that of the image in the journal that I clicked on.

The script basically goes through the images in a journal entry when it renders, adds a 'clickable-image' class to them, and then looks through the elements with that class and adds an event handler when they're clicked.

This event handler handles changing the tile's source in a specific scene called "Display" to that of the image in the journal.

# Motivation

I love being able to share art with my players. Though I know some groups prefer complete Theater of the Mind using only imagination, images help me and my group with immersion, improv, and with 'pseudo-TOTM' battles when I don't want to use a battlemap.

The motivation behind this project is to have a journal entry with many images, that you can click through to show your players art for characters, locations, monsters, etc. while not having to miss a beat if you also need to narrate.

Years ago I tried to do this using Google Slides, but it was clunky and a pain in the butt. Then another VTT (GM Forge) came along that had this feature and I absolutely loved it, but the VTT stopped being supported.

I then tried to replicate the feature in other VTTs but nothing quite worked the way I wanted.

Upon getting Foundry VTT, I finally learned Javascript, with some help from some StackOverflow posts and reading over the source code for the Image-Drop, Sound-Link and Journal-Links modules helped me figure out how to implement this feature on my own. 


# Credits

GMForge -- this feature was originally built into [GMForge](https://store.steampowered.com/app/842250/GM_Forge__Virtual_Tabletop/) which I used while it was still supported. I adored this feature and wanted to bring it to Foundry VTT, as I could never quite find another solution that scratched this itch and satisfied me in the same way. 

My figuring out how to do this in FoundryVTT is thanks largely to studying the source code of the modules [Drag Upload](https://github.com/cswendrowski/FoundryVTT-Drag-Upload) by *cswendrowski*, [Image-Drop](https://gitlab.com/mesfoliesludiques/foundryvtt-image-drop) by *U~man*, [Journal-Links](https://github.com/Sigafoos/journal-links) by *Sigafoos* and [Sound-Link](https://github.com/superseva/sound-link) by *superseva*. 

Thanks to Joe Neeves whose tabletop art from Gumroad: https://gumroad.com/limonium provided the decorative tiles.

# Contact Me

*Discord*: Eva#3782

*Email*: EvanesceExotica@gmail.com
