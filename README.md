# squarespace_gulp
A Gulp/Babel boilerplate for Squarespace.  The build tool will:
* Transpile and concatenate ES6 into browser compatible ES5
* Preprocess and concatenate **Modern versions of LESS** *see notes*
* Auto-prefix your CSS with browser vendor prefixes
* Upload all changed files via SFTP to your dev site

## File structure
* **src** 
  * less - Put all your .less files in here!
  * js - Put all your ES6 / JS files in here!

* gulp-sftp-auth.js - Your SFTP credentials go here, in strings

## Step 1: Clone your template repository
Create a new site on Squarespace, flip on Developer Mode, and clone the repository

## Step 2: Clone this repository
Somewhere on your computer,

```git clone https://github.com/brianjcarroll/squarespace_gulp.git```

## Step 3: npm install
You'll need to have node and npm installed.
Open up your terminal and then run

```npm install```

Copy the files and folders from squarespace_gulp into your template repository

## Step 4: Enter your SFTP credentials
Open up gulp-sftp-auth.js and fill out your username, password, and remote-path

The username and password is what you used to sign up for Squarespace
The remote path is the identifier of your site. If your URL is http://bcarroll.squarespace.com then the identifier is **/bcarroll/**. Include the slashes.

## Step 5: Open up the Command Line
Make sure you have gulp installed globally.

`gulp` -- This will watch all files, and transpile / preprocess, and upload via SFTP as necessaru

`gulp upload` -- This will upload all relevant Squarespace files to your site in one go.

## Notes:
This is important. In order for all of this to work, you must do a few things.
First, open up **template.conf** and add 'main.css' to the stylesheets array. This file, main.css, is the preprocessed, concatenated CSS file generated from all the .less files in your src/less folder.

Second, open up site.region (or wherever you include your script tags), and add this to the bottom:

```<squarespace:script src="main.js" combo="false"></script>```

Don't touch anything in your styles or scripts folder from here on out - they are automatically built by gulp!

Good luck :-)
