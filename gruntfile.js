// NOTE: in order to make any of these work, you'll need to:
// 1. Install npm onto the operating system http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/
// 2. run `npm install grunt -g`, which installs grunt globally for running these tasks
// 3. run `npm install grunt-cli -g`, which installs globally a command line client for grunt
// 4. run `npm install`, which installs all of the dependencies for this project locally
module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Sync up files to Amazon S3
    aws_s3: {
      options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        uploadConcurrency: 5,
        downloadConcurrency: 5,
        excludedFromGzip: ['*.ico']
      },
      production: {
        options: {
          // debug: true,
          differential: true,
          bucket: process.env.AWS_BUCKET
        },
        files: [
          {expand: true, cwd: 'build/', src: ['**'], dest: ''}
        ]
      },
    },

    // Deletes all .tmp.* files
    clean: {
      // used at start to wipe folder
      build: {
        src: ['build']
      },

      // used at end to clean out defunct files, folders
      css: ['build/css'],
      html: ['build/*.tmp.html']
    },

    // local http server
    connect: {
      src: {
        options: {
          keepalive: true,
          livereload: true,
          port: 8000,
          base: {
            path: 'src'
          }
        }
      },
      build: {
        options: {
          keepalive: true,
          port: 8000,
          base: {
            path: 'build'
          }
        }
      }
    },

    // Copy over favicon
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: ['src/img/*'],
            dest: 'build/img/',
            filter: 'isFile',
            flatten: true
          },
        ],
      },
    },

    // Minify CSS files
    cssmin: {
      combine: {
        files: {
          'build/css/homepage.gz.css': ['src/css/styles.css']
        }
      }
    },

    // minify HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.tmp.html',  // 'destination': 'source'
        }
      },
    },

    // Update HTML to have paths of minified CSS, JS
    processhtml: {
      dist: {
        files: {
          'build/index.tmp.html': ['src/index.html']
        }
      }
    },

    // Convert SCSS to CSS
    sass: {
      dist: {
        files: {
          'src/css/styles.css' : 'src/css/styles.scss'
        }
      }
    },

    // This runs `sass` grunt command whenever any new SASS is written
    // Start this up (by running `grunt watch` in this dir) whenever making any style changes
    watch: {
      css: {
        files: 'src/**/*.scss',
        tasks: ['sass']
      }
    }
  });


  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-aws-s3-gzip');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');


  // 4. Where we tell Grunt what to do when we type 'grunt' into the terminal.

  // By default, do nothing
  grunt.registerTask('default', []);

  // Build command to generate optimized site
  grunt.registerTask('build', [
    'clean:build',
    'copy:main',
    'cssmin',
    'processhtml',
    'htmlmin',
    'clean:css',
    'clean:html',
  ]);

  // Send files up to s3
  grunt.registerTask('production', ['build', 'aws_s3']);
};
