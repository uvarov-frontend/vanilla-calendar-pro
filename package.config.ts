/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	publicDir: './package/public',
	build: {
		target: 'ES6',
		assetsDir: '',
		outDir: './package/build',
		cssCodeSplit: true,
		minify: 'terser',
		rollupOptions: {
			output: {
				inlineDynamicImports: false,
				format: 'cjs',
				entryFileNames: '[name].min.js',
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && ['light.css', 'dark.css'].includes(assetInfo.name)) {
						return 'themes/[name].min.[ext]';
					}
					return '[name].min.[ext]';
				},
			},
			input: {
				light: resolve(__dirname, './package/src/styles/themes/light.css'),
				dark: resolve(__dirname, './package/src/styles/themes/dark.css'),
				'vanilla-calendar': resolve(__dirname, './package/src/vanilla-calendar.ts'),
			},
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
