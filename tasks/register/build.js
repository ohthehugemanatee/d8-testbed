module.exports = function (grunt) {
	grunt.registerTask('build', [
		'buildStyles',
		'buildPatternlab'
	]);
};
