/* eslint-disable max-len */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./public/demo/index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
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
	plugins: [],
};
