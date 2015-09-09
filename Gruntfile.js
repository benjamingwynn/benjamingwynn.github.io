module.exports = function(grunt) {
	pkg: grunt.file.readJSON('package.json'),
	
	grunt.initConfig({
		include_bootstrap: {
			less: {
				files: {
					'xenxier.css': 'less/manifest.less'
				}
			}
		},
		watch: {
			files: ['less/*', 'less/xenxier/*'],
			tasks: ['include_bootstrap:less']
		}
	});

	// Load the bootstrap plugin
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-include-bootstrap');
	
	// On default, compile LESS
	grunt.registerTask('default', ['include_bootstrap:less']);
};
