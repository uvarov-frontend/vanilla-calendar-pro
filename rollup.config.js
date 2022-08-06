import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import userscriptHeader from 'rollup-plugin-userscript-header';

export default {
	input: 'index.js',
	output: {
		file: './build/vanilla-calendar.min.js',
		name: 'VanillaCalendar',
		format: 'umd',
		sourcemap: false,
	},
	plugins: [
		babel({
			babelHelpers: 'bundled',
		}),
		terser(),
		scss({
			output: './build/vanilla-calendar.min.css',
			outputStyle: 'compressed',
			sourceMap: false,
		}),
		userscriptHeader({
			overwrite: {
				match: false,
				author: false,
				description: false,
			}
		}),
	],
};
