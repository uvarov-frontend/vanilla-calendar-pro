/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./demo/**/*.{html,css}',
		'./src/**/*.{js,ts}',
	],
	theme: {
		maskImage: {
			arrow: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M12 16c-.3 0-.5-.1-.7-.3l-6-6c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l5.3 5.3 5.3-5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-6 6c-.2.2-.4.3-.7.3z\'/></svg>")',
		},
		extend: {
			backgroundImage: {
				'light-mode': 'linear-gradient(145deg, rgb(6 182 212 / 4%) 12%, rgb(6 182 212 / 10%) 42%, rgb(6 182 212 / 5%) 60%, rgb(6 182 212 / 18%) 85%)',
				'dark-mode': 'linear-gradient(145deg, rgb(6 182 212 / 0%) 12%, rgb(6 182 212 / 3%) 42%, rgb(6 182 212 / 10%) 60%, rgb(6 182 212 / 4%) 85%)',
			},
		},
	},
	corePlugins: {
		borderOpacity: false,
		textOpacity: false,
	},
	plugins: [
		plugin(({ addUtilities, matchUtilities, theme }) => {
			matchUtilities(
				{
					'mask-image': (value) => ({
						maskImage: value,
					}),
				},
				{ values: theme('maskImage') },
			);
			addUtilities({
				'.mask-center': {
					'mask-position': 'center center',
				},
				'.mask-no-repeat': {
					'mask-repeat': 'no-repeat',
				},
			});
		}),
	],
};
