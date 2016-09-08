'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		
		//Read the package.json (optional)
		pkg: grunt.file.readJSON('package.json'),
		
		// Metadata.
        meta: {
            dist: 'app/dist',
			src: 'app/src'
        },
		
		banner: '/* <%=pkg.name%> - v<%=pkg.version%> - <%=grunt.template.today("yyyy-mm-dd")%>\n' +
                '** Copyright (c) <%=grunt.template.today("yyyy")%> */\n',
		
		// Task configuration.
		jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
			build: ['Gruntfile.js', '<%=meta.src%>/js/*.js', '!<%=meta.src%>/js/app.js']
		},

        concat: {
            options: {
                //separator: ';'
            },
            dist: {
                src: [
                    '<%=meta.src%>/js/base.js',
                    '<%=meta.src%>/js/controllers.js',
                    '<%=meta.src%>/js/services.js',
                    '<%=meta.src%>/js/directives.js',
                    '<%=meta.src%>/js/filters.js'
                ],
                dest: '<%=meta.src%>/js/app.js'
            }
        },

		uglify: {
			options: {
				stripBanners: true,
				banner: '<%=banner%>'
			},
			build: {
				files: [{
					expand: true,
					cwd: '<%=meta.src%>/js',
					src: ['app.js'],  //['*.js', '!*.min.js']
					dest: '<%=meta.dist%>/js',
					ext: '.min.js'
				}]
			}
		},

        compass: {                      // Task
            dist: {                     // Target
                options: {              // Target options
                    config: 'config.rb',
                    sassDir: '<%=meta.src%>/sass',
                    cssDir: '<%=meta.src%>/css'
                }
            }
        },
		
		csslint: {
		    options: {
			    csslintrc: '.csslintrc'
		    },
		    strict: {
			    options: {
			        import: false
			    },
			    src: ['<%=meta.src%>/css/*.css']
		    }
		},

        cssmin: {
            options: {
                stripBanners: true,
                banner: '<%=banner%>'
            },
			build: {
				files: [{
				    expand: true,
				    cwd: '<%=meta.src%>/css',
				    src: ['*.css', '!*.min.css'],
				    dest: '<%=meta.dist%>/css',
				    ext: '.min.css'
				}]
			}
        },

		watch: {
			build: {
				files: [
                    '<%=meta.src%>/js/*.js',
                    '!<%=meta.src%>/js/app.js',
                    '<%=meta.src%>/sass/**/*.scss*'
                ],
				tasks: ['jshint', 'concat', 'uglify', 'compass', 'csslint', 'cssmin'],
				options: {
					spawn: false
				}
			}
		}

	});
	
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Default tasks.
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass', 'csslint', 'cssmin', 'watch']);
};