module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
          compile: {
            files: {
              'layout/assets/js/coffee.js': 'layout/assets/js/*.coffee'
            }
          }
        },

        concat: {
            dist: {
                src: ['layout/assets/js/*.js',],
                dest: 'layout/media/js/scripts.js',
            }
        },

        uglify: {
            options: {
              compress: false,
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
                compress: false,
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
            destImg: 'layout/media/images/sprite.png',
            destCSS: 'layout/assets/css/variables/sprite-mixins.styl',
            algorithm: 'binary-tree',
            padding: 1,
            imgPath: '../images/sprite.png',
            cssTemplate: 'sprite_template/mixins.mustache',
            cssVarMap: function (sprite) {
              sprite.name = 's-' + sprite.name;
            },
          },
        },

        watch: {
          sprite: {
            files: ['layout/media/images/sprite/*'],
            tasks: ['sprite'],
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
          coffee: {
            files: ['layout/assets/js/*.coffee'],
            tasks: ['coffee'],
          }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.registerTask('default', ['coffee', 'concat', 'sprite', 'stylus', 'uglify', 'watch']);

};
