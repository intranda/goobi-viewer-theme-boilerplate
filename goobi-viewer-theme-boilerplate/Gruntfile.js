module.exports = function(grunt) {
	// ---------- PROJECT CONFIG ----------
    grunt.initConfig({
        theme: {
            name: 'boilerplate',
            subThemeOne: 'boilerplate-subtheme'
        },
        pkg: grunt.file.readJSON('package.json'),
        banner: {
            text: '/*!\n ============================================================\n <%= pkg.name %> \n\n Version: <%= pkg.version %> \n License: <%= pkg.license %> \n Author: <%= pkg.author %> \n Description: <%= pkg.description %> \n ============================================================ \n*/'
        },
        src: {
        	jsFolder: 'WebContent/resources/themes/<%=theme.name%>/javascript/',
            jsDistFolder: 'WebContent/resources/themes/<%=theme.name%>/javascript/dist/',
            lessFolder: 'WebContent/resources/themes/<%=theme.name%>/css/less/',
            lessCsFolder: 'WebContent/resources/themes/<%=theme.name%>/css/less/crowdsourcing/',
            lessSubThemeOneFolder: 'WebContent/resources/themes/<%=theme.name%>/css/less/subthemes/<%=theme.subThemeOne%>/',
            cssFolder: 'WebContent/resources/themes/<%=theme.name%>/css/',
            cssDistFolder: 'WebContent/resources/themes/<%=theme.name%>/css/dist/'
        },
        less: {
            dist: {
                options: {
                	paths: [ '<%=src.lessFolder%>' ],
                	plugins: [
                		new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                	],
                    compress: true,
                    sourceMap: true,
                    banner: '<%=banner.text%>',
                },
                files: {
                	'<%=src.cssDistFolder%><%=theme.name%>Styles.css': '<%=src.lessFolder%>build.less',
                	'<%=src.cssDistFolder%><%=theme.name%>CrowdsourcingStyles.css': '<%=src.lessCsFolder%>build.less',
                	'<%=src.cssDistFolder%><%=theme.name%>SubthemeOneStyles.css': '<%=src.lessSubThemeOneFolder%>build.less',
                },
            }
        },
        riot: {
            options:{
                concat: true
            },
            dist: {
                expand: false,
                src: '<%=src.jsFolder %>**/*.tag',
                dest: '<%=src.jsDistFolder%><%=theme.name%>Tags.js'
            }
        },
        watch: {
        	configFiles : {
				files : [ 'Gruntfile.js' ],
				options : {
					reload : true
				}
			},
            css: {
                files: [ '<%=src.lessFolder%>**/*.less' ],
                tasks: [ 'less' ],
                options: {
                    spawn: false,
                }
            },
            riot: {
            	files : [
            		'<%=src.jsFolder %>**/*.tag'
			 	],
			 	tasks : [ 'riot' ],
			 	options : {
			 		spawn : false,
			 	}
			}
		},
    });
    
	// ---------- LOAD TASKS ----------
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-riot');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
	// ---------- REGISTER DEVELOPMENT TASKS ----------
    grunt.registerTask('default', [ 'watch' ]);
};