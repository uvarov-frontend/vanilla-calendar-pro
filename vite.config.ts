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
		cssCodeSplit: true,
		minify: 'terser',
		rollupOptions: {
			output: {
				inlineDynamicImports: false,
				format: 'cjs',
				entryFileNames: '[name].min.js',
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.includes('demo')) {
						return 'demo/[name].min.[ext]';
					}
					if (assetInfo.name && ['light.css', 'dark.css'].includes(assetInfo.name)) {
						return 'themes/[name].min.[ext]';
					}
					return '[name].min.[ext]';
				},
			},
			input: {
				demo: resolve(__dirname, '/src/styles/demo.css'),
				light: resolve(__dirname, '/src/styles/themes/light.css'),
				dark: resolve(__dirname, '/src/styles/themes/dark.css'),
				'vanilla-calendar': resolve(__dirname, '/src/vanilla-calendar.ts'),
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
