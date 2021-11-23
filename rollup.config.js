import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: !production && true,
		format: 'es',
		name: 'app',
		dir: 'public/build/',
	},
	plugins: [
		// get fonts from type module
		copy({
			targets: [
				{ src: 'node_modules/@codeofdesign/fonts/fk-raster-roman', dest: 'public/fonts' },
				{ src: 'node_modules/@codeofdesign/fonts/public-sans', dest: 'public/fonts' },
				{ src: 'node_modules/codeofdesign/dist/json/*.json', dest: 'public/versions' },
			],
			copyOnce: true,
			hook: 'transform',
		}),

		json(),

		// process svelte
		svelte({
			compilerOptions: {
				dev: !production,
	    },
	    preprocess: preprocess(),
		}),


		// process sass
		scss({ output: 'public/build/bundle.css' }),

		dynamicImportVars({ sourcemap: false }),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'public/build/bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
    exclude: ['public/**/*', 'node_modules', '.git'],
		clearScreen: false,
	}
};
