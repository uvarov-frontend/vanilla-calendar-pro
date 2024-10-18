/* eslint-disable @typescript-eslint/no-var-requires */
const { minify } = require('terser');
const fs = require('fs');

function removeTabsAndNewLines() {
	const files = process.argv.filter((arg) => arg.includes('--files='))[0].replace('--files=', '').split(',');
	if (!files?.[0]) return;

	files.forEach((file) => {
		fs.readFile(file, 'utf8', async (err, data) => {
			if (err) throw new Error(`Error reading file: ${err}`);

			const result = await minify(data);
			fs.writeFile(file, result.code.replace(/\\[nt](?!\]|\\t\])/g, ''), (error) => {
				if (error) throw new Error(`Error write file: ${err}`);
			});
		});
	});

	// eslint-disable-next-line no-console
	console.log('\x1b[42m', '✓ Files are minified', '\x1b[0m');
}
removeTabsAndNewLines();
