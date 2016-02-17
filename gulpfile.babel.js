// Put your Squarespace SFTP credentials in the sftp-auth file
import auth from './gulp-sftp-auth';

/* Dependencies */
const gulp    = require('gulp');
const watch   = require('gulp-watch');
const rename  = require('gulp-rename');
const babel   = require('gulp-babel');
const sftp    = require('gulp-sftp');
const concat  = require('gulp-concat');
const changed = require('gulp-changed');
const less    = require('gulp-less');
const path    = require('path');


// How many times SFTP should attempt a connection
const retries = 6;
let i = 1;

// Autoprefix plugin for gulp-less
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const autoprefix = new LessPluginAutoPrefix({
  browsers: [ 'last 2 versions' ],
});

// Authenticate SFTP connection and upload the changed file
function handleSFTP(file) {
  let f = file.constructor !== Array ? file.path : file;
  return gulp
    .src(f)
    .pipe(changed('../*'))
    .pipe(sftp({
      host: auth.host,
      user: auth.user,
      pass: auth.pass,
      port: auth.port,
      remotePath: auth.remotePath,
    })
    .on('error', function(error){
      if(i < retries) {
        handleSFTP(file);
        console.log('SFTP Attempt number: ', i);
        i++;
      } else {
        console.log('Connection refused for whatever reason. Restart gulp');
        process.exit();
      }
    })
  );
}

/* Tasks */

// Compile and concatenate ES6 in src/js
gulp.task('scripts', () => {
  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('../scripts'));
});

// Preprocess and autoprefix LESS in src/less
gulp.task('less', () => {
  return gulp
    .src('src/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'src/less', 'includes') ],
      plugins: [autoprefix],
    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('../styles'));
})

// Watch for changes to src/* files and upload them via SFTP
gulp.task('watch', () => {

  gulp.watch('src/js/*.js', [ 'scripts' ]);
  gulp.watch('src/less/*.less', [ 'less' ]);

  gulp.watch(['../*.region', '../blocks/*', '../template.conf', '../styles/*.css','../scripts/*.js', '../collections/*', '../assets/*', '../pages/*'])
  .on('change', (file) => {
    handleSFTP(file);
  });

});

gulp.task('upload', () => {
  let files = ['../*.region', '../blocks/*', '../template.conf', '../styles/*.css','../scripts/*.js', '../collections/*', '../assets/*', '../pages/*'];
  handleSFTP(files)
});

gulp.task('default', ['watch']);

gulp.task('sync', ['upload']);
