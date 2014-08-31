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
        accessKeyId: 'AKIAJYLZ3TXS43QZIS2Q',
        secretAccessKey: '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',
        uploadConcurrency: 5,
        downloadConcurrency: 5,
        excludedFromGzip: ['*.gif', '*.jpg', '*.png', '*.ico']
      },
      production: {
        options: {
          // debug: true,
          differential: true,
          bucket: 'craigruks-com'
        },
        files: [
          {expand: true, cwd: 'build/', src: ['**'], dest: ''}
        ]
      },
    },


    // Deletes all .tmp.* files, but skips min.js files
    clean: {
      build: {
        src: [ 'build' ]
      },

      js: ["build/**/*.js", "!build/**/*.gz.js"],
      css: ["build/**/*.css", "!build/**/*.gz.css"],
      html: ["build/*.tmp.html"]
    },


    // Minify CSS files
    cssmin: {
      combine: {
        files: {
          'build/css/homepage.gz.css': ['craigruks/css/styles.css']
        }
      }
    },


    // Optimize image sizes
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'craigruks/img/',
          src: ['**/*.{png,jpg,gif,ico}'],
          dest: 'build/img/'
        }]
      }
    },


    // Update HTML to have paths of minified CSS, JS
    processhtml: {
      dist: {
        files: {
          'build/index.html': ['craigruks/index.html']
        }
      }
    },


    // Convert SCSS to CSS
    sass: {
      dist: {
        files: {
          'craigruks/css/styles.css' : 'craigruks/css/styles.scss'
        }
      }
    },


    // Minify JS files
    uglify: {
      build: {
        files: {
          'build/js/homepage.gz.js': [
            'craigruks/js/zepto.min.js',
            'craigruks/js/homepage.js'
          ]
        }
      }
    },


    // This runs `sass` grunt command whenever any new SASS is written
    // Start this up (by running `grunt watch` in this dir) whenever making any style changes
    watch: {
      css: {
        files: 'craigruks/**/*.scss',
        tasks: ['sass']
      }
    }

  });



  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-aws-s3-gzip');



  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

  // By default, do nothing
  grunt.registerTask('default', []);

  // Build command to generate optimized site
  grunt.registerTask('build', [
    'clean:build',
    'cssmin',
    'uglify',
    'processhtml',
    'imagemin'
  ]);

  // Send files up to s3
  grunt.registerTask('production', [ 'build', 'aws_s3' ]);

};