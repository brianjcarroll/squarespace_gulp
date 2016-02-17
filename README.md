# squarespace_gulp
A Gulp/Babel boilerplate for Squarespace.  The build tool will:
* Transpile and concatenate ES6 into browser compatible ES5
* Preprocess and concatenate **Modern versions of LESS** *see notes*
* Auto-prefix your CSS with browser vendor prefixes
* Upload all changed files via SFTP to your dev site

## Step 1: Clone your template repository
Create a new site on Squarespace, flip on Developer Mode, and clone the repository

## Step 2: Clone this repository
Somewhere on your computer,
`git clone https://github.com/brianjcarroll/squarespace_gulp.git`

## Step 3: Copy files
Copy the files and folders from squarespace_gulp into your template repository

## Step 4: Enter your SFTP credentials
Open up gulp-sftp-auth.js and fill out your username, password, and remote-path

The username and password is what you used to sign up for Squarespace
The remote path is the identifier of your site. If your URL is http://bcarroll.squarespace.com then the identifier is **/bcarroll/**. Include the slashes.

## Step 5: Run gulp
Two commands:
`gulp` -- 
