import { resolve } from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pages = require('./get-pages');

const input = pages.reduce((acc: string[], current: string, index: number) => {
	acc['0'] = resolve(__dirname, 'demo', 'index.html');
	acc[index + 1] = resolve(__dirname, current);
	return acc;
}, {});

export default defineConfig({
	root: './demo',
	build: {
		assetsDir: '',
		outDir: 'build',
		target: 'ES6',
		cssCodeSplit: true,
		minify: 'terser',
		rollupOptions: {
			input,
		},
	},
	server: {
		port: 5173,
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './'),
		},
	},
});
