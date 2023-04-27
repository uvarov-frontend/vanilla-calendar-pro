import { defineConfig } from 'vite';

export default defineConfig({
	root: './demo',
	build: {
		assetsDir: '',
		outDir: 'build',
		target: 'ES6',
		cssCodeSplit: true,
		minify: 'terser',
	},
});
