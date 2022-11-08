const replace = require('replace-in-file');

replace({
	files: './build/vanilla-calendar.min.js',
	from: ['!function', '()));'],
	to: ['if(typeof window!==\'undefined\'){!function', '()));}'],
});
