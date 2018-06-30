const path = require('path');

const autoprefixer = require('autoprefixer');
const sass = require('node-sass');

module.exports = function init(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CSS

		sass: {
			options: {
				implementation: sass,
				includePaths: ['.', path.resolve(__dirname, 'node_modules')],
				outputStyle: 'compressed',
				sourceMap: true,
			},
			dist: {
				expand: true,
				cwd: 'src/',
				src: ['**/*.scss'],
				dest: 'static/',
				ext: '.css',
			},
		},
		postcss: {
			options: {
				map: true,
				processors: [
					autoprefixer({ browsers: 'last 1 version, not dead, >1% in SG' }),
				],
			},
			dist: {
				expand: true,
				cwd: 'static/',
				src: ['**/*.css'],
				dest: 'static/',
			},
		},

		// SVG

		svgmin: {
			dist: {
				expand: true,
				cwd: 'src/',
				src: ['**/*.svg'],
				dest: 'static/',
			},
		},

		// JS

		babel: {
			options: {
				presets: ['@babel/preset-env'],
				sourceMap: true,
			},
			dist: {
				expand: true,
				cwd: 'src/',
				src: ['**/*.js'],
				dest: 'static/',
			},
		},

		watch: {
			css: {
				files: 'src/**/*.scss',
				tasks: ['sass', 'postcss'],
			},
			svg: {
				files: 'src/**/*.svg',
				tasks: ['svgmin'],
			},
			js: {
				files: 'src/**/*.js',
				tasks: ['babel'],
			},
		},
	});

	// CSS
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	// SVG
	grunt.loadNpmTasks('grunt-svgmin');
	// JS
	grunt.loadNpmTasks('grunt-babel');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'postcss', 'svgmin', 'babel']);
};
