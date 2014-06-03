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
              'layout/media/css/media-xs.css': 'layout/assets/css/blocks/xs.styl'
            }
          }
        },

        sprite: {
          mixins: {
            src: ['layout/media/images/sprite/*.png'],
            destImg: 'layout/media/images/spritesheet.png',
            destCSS: 'layout/media/images/sprite-mixins.styl',
            algorithm: 'binary-tree',
            padding: 1,
            cssFormat: ['stylus', 'css'],
            cssTemplate: 'sprite_template/mixins.mustache',
            cssVarMap: function (sprite) {
              sprite.name = 's-' + sprite.name;
            },
          },

          css: {
            src: ['layout/media/images/sprite/*.png'],
            destImg: 'layout/media/images/spritesheet.png',
            destCSS: 'layout/media/images/sprite-mixins.css',
            algorithm: 'binary-tree',
            padding: 1,
            cssFormat: ['stylus', 'css'],
            cssTemplate: 'sprite_template/mixins.mustache',
            cssVarMap: function (sprite) {
              sprite.name = 's-' + sprite.name;
            },
          }
        },

        shell: {
            multiple: {
              command: [
                'glue layout/media/images/sprite --img=layout/media/images --scss=layout/assets/css/variables --css=layout/assets/css',
                'mv layout/assets/css/variables/sprite.scss layout/assets/css/variables/sprite-mixins.styl',
                'mv layout/assets/css/sprite.css layout/assets/css/sprite.styl'
              ].join('&&')
            }
        },

        watch: {
          shell: {
            files: ['layout/media/images/sprite/*'],
            tasks: ['shell', 'sprite'],
          },
          stylus: {
            files: ['layout/assets/css/**/*.styl'],
            tasks: ['stylus'],
          },
          scripts: {
            files: ['layout/assets/js/scripts.js'],
            tasks: ['concat'],
            options: {
              interrupt: true,
            },
          },
          plugins: {
            files: ['layout/assets/js/plugins/*.js'],
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
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-shell');



    grunt.registerTask('default', ['shell', 'sprite', 'stylus', 'concat', 'uglify', 'watch'], function(){
      grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
    });

};
