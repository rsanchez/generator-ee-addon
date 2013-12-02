'use strict';

module.exports = function(grunt)
{
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['js/src/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        concat: {
            options: {
                stripBanners: true,
                separator: ';'
            },
            build: {
                src: ['js/src/*.js'],
                dest: 'js/script.min.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%%= pkg.name %> <%%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/script.min.js',
                dest: 'js/script.min.js'
            }
        },

        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: { 'css/style.css': 'scss/style.scss' }
            }
        },

        watch: {
            scripts: {
                files: ['js/src/*.js'],
                tasks: ['buildScripts']
            },
            styles: {
                files: ['scss/*.scss'],
                tasks: ['buildStyles']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['buildScripts', 'buildStyles']);
    grunt.registerTask('buildScripts', ['concat', 'uglify']);
    grunt.registerTask('buildStyles', ['sass']);
};