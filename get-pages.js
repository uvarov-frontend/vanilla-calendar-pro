/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const pages = [];

function fromDir(startPath, filter) {
	if (!fs.existsSync(startPath)) {
		// eslint-disable-next-line no-console
		console.log('no dir ', startPath);
		return;
	}

	const files = fs.readdirSync(startPath);
	for (let i = 0; i < files.length; i++) {
		const filename = path.join(startPath, files[i]);
		const stat = fs.lstatSync(filename);
		if (stat.isDirectory()) {
			fromDir(filename, filter); // recurse
		} else if (filename.endsWith(filter)) {
			pages.push(filename);
		}
	}
}

fromDir('./demo/pages', '.html');

module.exports = pages;
