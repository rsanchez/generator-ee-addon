'use strict';

module.exports = function(grunt)
{
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sourceDir: 'assets',

        jshint: {
            files: ['<%%= sourceDir %>/js/src/*.js'],
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
                src: ['<%%= sourceDir %>/js/src/*.js'],
                dest: '<%%= sourceDir %>/js/cp.min.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%%= pkg.name %> <%%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%%= sourceDir %>/js/cp.min.js',
                dest: '<%%= sourceDir %>/js/cp.min.js'
            }
        },

        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: { '<%%= sourceDir %>/css/cp.css': '<%%= sourceDir %>/scss/cp.scss' }
            }
        },

        watch: {
            scripts: {
                files: ['<%%= sourceDir %>/js/src/*.js'],
                tasks: ['buildScripts']
            },
            styles: {
                files: ['<%%= sourceDir %>/scss/*.scss'],
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