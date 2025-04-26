# A gallery created with _some_ "vibe coding"! 

### [Tiny Lense of Shafayet Rajit](https://shafayetrajit.github.io/gallery/)

This website is mostly built using GPT-4o. The sole purpose of building this site was to see if I could actually replicate another design through vibe-coding. 

> _I'm not that great a photographer. Most of my shots are taken with smartphones. So, the photos just aren't that great._ 

The website is heavily inspired by [this design](https://github.com/rampatra/photography), which is built using Jekyll. The reason I really liked the Jekyll site is that it shows each image's EXIF data. I tried to replicate this using HTML, CSS, and JavaScript...and I think it came out pretty great.  

Not only did I manage to create a similar design, but I also optimized the site. As we all know, every site with many photos takes a lot of time to load. So, I displayed the webp version of the image on the thumbnails, and the jpg will pre-load in the background. In that way, the site loads faster, and when an image is clicked, the jpg, along with the EXIF data, is shown. 

However, the site still took some time to load all the thumbnails. So, I created a loading screen that displays a fun message as well as a photography fact while the site finishes loading. There are two lists containing different messages and facts. A random message from this list is displayed in the loading screen. The fact also keeps changing after a fixed interval. It is quite a _silly_ workaround, but it works.  
