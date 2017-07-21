# Damien Beard's Portfolio - 2.0

This repo contains the raw files for my personal portfolio website. It is open source, so feel free to use inspiration/direct files from any part of it. The website itself is constructed using React to create project cards and populate the page (client-side). 

### Running the project
Running the site locally is dead easy - just open the index.html file in the browser. This site suns off an FTP server, so it's basic af. That said, the construction of React components using JSON data on-the-fly is kind of cool :) 

### Javascript
When editing the javascript in this project, you should use the `src/js/` folder. When you first start working, navigate to the this folder in the directory and run the following command in the terminal:
```
$ babel --presets es2015,react --watch src/js/ --out-dir js/
```

This will turn the jsx code into vanilla javascript. This is also a watcher file, so you only have to do this at the beginning of your work and leave it to run, and it will work in the background.

### Stylesheets
You should edite the `damien.less` file to update styles, not the css file directly. 

To see the changes reflected in the browser, in the Website_2.0 directory run the following command in the terminal:
```
lessc css/damien.less css/damien.css
```
Make sure the file is saved before you do this, otherwise nothing will show in the browser. 

# Boilerplate for Menu:

### Blueprint: Multi-Level Menu

A simple multi-level menu with delayed item animations and optional breadcrumb navigation and back button. 

[Article on Codrops](http://tympanus.net/codrops/?p=25521)

[Demo](http://tympanus.net/Blueprints/MultiLevelMenu/)

Check out all of our Blueprints [here](http://tympanus.net/codrops/category/blueprints/)

Read more here: [License](http://tympanus.net/codrops/licensing/)
