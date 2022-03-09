const fs = require("fs"); 

let homedir = require("os").homedir();
let rawdata = fs.readFileSync(homedir + '/.config/grunt_userconfig.json');
let config = JSON.parse(rawdata);

function getTomcatDir() {
	return config.tomcat_dir;
}

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
			jsDevFolder: 'WebContent/resources/themes/<%=theme.name%>/javascript/dev/',
            jsDistFolder: 'WebContent/resources/themes/<%=theme.name%>/javascript/dist/',
            lessFolder: 'WebContent/resources/themes/<%=theme.name%>/css/less/',
            lessCsFolder: 'WebContent/resources/themes/<%=theme.name%>/css/less/crowdsourcing/',
            lessSubThemeOneFolder: 'WebContent/resources/themes/<%=theme.name%>/css/less/subthemes/<%=theme.subThemeOne%>/',
            cssFolder: 'WebContent/resources/themes/<%=theme.name%>/css/',
            cssDistFolder: 'WebContent/resources/themes/<%=theme.name%>/css/dist/'
        },
        sync: {
        	main: {
        		files: [{
        			cwd: 'WebContent',
        			src: [
        				'**'
        			],
        			dest: getTomcatDir() + '\\goobi-viewer-theme-<%=theme.name%>'
        		}]
        	}
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
					sourceMapURL: "<%=theme.name%>.min.css.map",
					sourceMapRootpath: "../",
					sourceMapBasepath: "WebContent/resources/themes/<%=theme.name%>/css/",
                    banner: '<%=banner.text%>',
                },
                files: {
                	'<%=src.cssDistFolder%><%=theme.name%>.min.css': '<%=src.lessFolder%>constructor.less',
                	'<%=src.cssDistFolder%><%=theme.name%>-cs.css': '<%=src.lessCsFolder%>constructor.less',
                	'<%=src.cssDistFolder %><%=theme.subThemeOne%>.min.css': '<%=src.lessSubThemeOneFolder%>constructor.less',
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
		concat : {
		    options : {
		        separator : ';',
		    },
		    dist : {
		        src : [ '<%=src.jsDevFolder %>custom.js' ],
		        dest : '<%=src.jsDistFolder %>custom.min.js',
		    },
		},
        watch: {
        	configFiles : {
				files : [ 'Gruntfile.js' ],
				options : {
					reload : true
				}
			},
			xhtml: {
                files: [ 
                		'WebContent/resources/themes/<%=theme.name%>/**/*html',
                		'WebContent/resources/themes/<%=theme.name%>/**/*svg',
                		'WebContent/resources/themes/<%=theme.name%>/**/*png',
                		'WebContent/resources/themes/<%=theme.name%>/**/*jpg'
                	],
                tasks: [ 'sync' ],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: [ '<%=src.lessFolder%>**/*.less' ],
                tasks: [ 'less', 'sync' ],
                options: {
                    spawn: false,
                }
            },
            scripts: {
                files: [ '<%=src.jsDevFolder %>*.js' ],
                tasks: [ 'concat', 'sync' ],
                options: {
                	spawn: false,
                }
            },
            riot: {
            	files : [
            		'<%=src.jsFolder %>**/*.tag'
			 	],
			 	tasks : [ 'riot', 'sync' ],
			 	options : {
			 		spawn : false,
			 	}
			}
		},
    });
    
	// ---------- LOAD TASKS ----------
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-riot');
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sync');

    
	// ---------- REGISTER DEVELOPMENT TASKS ----------
    grunt.registerTask('default', [ 'watch', 'sync' ]);
};