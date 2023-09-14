/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	build: {
		target: 'ES6',
		assetsDir: '',
		outDir: './package/build',
		minify: 'terser',
		lib: {
			name: 'VanillaCalendar',
			fileName(format, entryName) { return `${entryName}.min${format === 'es' ? '.mjs' : '.js'}`; },
			entry: resolve(__dirname, '../package/src/scripts/vanilla-calendar.ts'),
		},
	},
	plugins: [
		banner({
			outDir: './package/build',
			content: 'name: @uvarov.frontend/vanilla-calendar | url: https://github.com/uvarov-frontend/vanilla-calendar',
		}),
		eslint(),
	],
});
