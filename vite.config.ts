/* eslint-disable import/no-extraneous-dependencies */
import fg from 'fast-glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	build: {
		target: 'ES6',
		assetsDir: '',
		outDir: 'build',
		cssCodeSplit: false,
		minify: 'terser',
		rollupOptions: {
			output: {
				format: 'umd',
				entryFileNames: 'vanilla-calendar.min.js',
				assetFileNames: 'vanilla-calendar.min.[ext]',
			},
			input: {
				index: resolve(__dirname, '/src/index.ts'),
			},
		},
	},
	plugins: [
		banner({
			outDir: 'build',
			content: 'name: @uvarov.frontend/vanilla-calendar | url: https://github.com/uvarov-frontend/vanilla-calendar',
		}),
		eslint(),
		{
			name: 'watch-external',
			async buildStart() {
				const files = await fg(['src/**/*', 'public/**/*']);
				files.forEach((file) => {
					this.addWatchFile(file);
				});
			},
		},
	],
});
