module.exports = function(grunt) {
 
	
	var args = process.argv; // grunt foo    aaa   bbbb      args[2] === aaa args[3] === bbb 
	

	grunt.loadNpmTasks('grunt-karma');  	
	grunt.loadNpmTasks('grunt-contrib-jshint');	
 
  // Project configuration.
  grunt.initConfig({
		
    pkg: grunt.file.readJSON('package.json'), // relevant to this project
 		
	karma: {  
	  unit: {
		options: {
		  frameworks: ['jasmine'],
		  singleRun: true,
		  browsers: ['PhantomJS'],
		  files: [
		 	'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'_ngClient/js/app.js',
			'_ngClient/js/**/*.js'
		  ]
		}
	  }
	} ,
 
 
		
	htmllint: {
			cms: {
				  options: {
					force: false,
					ingore : ['value must match the format: underscore']
				  /*  plugins: ['htmllint-plugin-name'],*/
					/* htmllint options go here */
				  },
				  src: [
				  //  '_ngClient/partials/cms/cms.html'
				 // '_ngClient/partials/_secure/statistics/statistics.html'
				  '_ngClient/partials/_secure/cms/cms.html'
				  ]
				}
			},	
 
 				
	jshint: {
				files: ['Gruntfile.js', '_ngClient/js/**/*.js' ],
			 
		 
				options: {
					force : true,
					reporter: require('jshint-stylish'),
					"esversion": 6,
					globals: {
						"angular": true,
						jQuery: true
					}
				} 
			} 		
 
});

  grunt.registerTask('test', [  
	  'jshint',
	  'karma'
	]);	

};