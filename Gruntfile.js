module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: ['layout/assets/js/*.js',],
                dest: 'layout/media/js/scripts.js',
            }
        },

        uglify: {
            options: {
              compress: true,
              beautify: false,
              preserveComments: false,
            },
            build: {
                src: 'layout/assets/js/plugins/*.js',
                dest: 'layout/media/js/plugins.js'
            }
        },

        stylus: {
          compile: {
            options: {
                compress: true,
            },
            files: {
              'layout/media/css/base.css': 'layout/assets/css/base/index.styl',
              'layout/media/css/main.css': 'layout/assets/css/all.styl',
              'layout/media/css/media-bs.css': 'layout/assets/css/blocks/bs.styl',
              'layout/media/css/media-md.css': 'layout/assets/css/blocks/md.styl',
              'layout/media/css/media-sm.css': 'layout/assets/css/blocks/sm.styl',
              'layout/media/css/media-xs.css': 'layout/assets/css/blocks/xs.styl',
            }
          }
        },

        watch: {
          stylus: {
            files: ['layout/assets/css/**/*.styl'],
            tasks: ['stylus'],
            options: {
              interrupt: true,
            },
          },
          scripts: {
            files: ['layout/assets/js/*.js'],
            tasks: ['concat'],
            options: {
              interrupt: true,
            },
          },
          plugins: {
            files: ['layout/assets/js/**/*.js'],
            tasks: ['uglify'],
            options: {
              interrupt: true,
            },
          },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['stylus', 'concat', 'uglify', 'watch']);

};
