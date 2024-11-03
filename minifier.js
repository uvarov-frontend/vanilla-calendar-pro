/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { minify: minifyJs } = require('terser');
const postcss = require('postcss');
const cssnano = require('cssnano');
const zlib = require('zlib');
require('colors');

const inputDir = path.resolve(__dirname, 'package/dist');

const logMessage = (type, file, originalSize, minifiedSize, gzipSize) => {
  const sizeToKb = (size) => Math.round((size / 1024) * 100) / 100;
  const originalSizeKb = sizeToKb(originalSize);
  const minifiedSizeKb = sizeToKb(minifiedSize);
  const gzipSizeKb = sizeToKb(gzipSize);

  console.log(`Minified ${type}: `.gray + `${file}`.blue + ' | ' + `${originalSizeKb} kB → ${minifiedSizeKb} kB `.green + `(gzip: ${gzipSizeKb} kB)`.magenta);
};

const getGzipSize = (content) => Buffer.byteLength(zlib.gzipSync(content));

const minifyFile = async (filePath, minifier) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const originalSize = Buffer.byteLength(fileContent);

  try {
    const result = await minifier(fileContent);
    fs.writeFileSync(filePath, result.code || result.css);

    const minifiedSize = Buffer.byteLength(result.code || result.css);
    const gzipSize = getGzipSize(result.code || result.css);
    logMessage(path.extname(filePath).slice(1).toUpperCase(), path.basename(filePath), originalSize, minifiedSize, gzipSize);
  } catch (e) {
    console.error(`Error minifying ${path.basename(filePath)}:`.red, e);
  }
};

const processDirectory = async (directory) => {
  const files = fs.readdirSync(directory);
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        await processDirectory(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
        await minifyFile(filePath, minifyJs);
      } else if (file.endsWith('.css')) {
        await minifyFile(filePath, (content) => postcss([cssnano]).process(content, { from: filePath }));
      }
    }),
  );
};

processDirectory(inputDir)
  .then(() => console.log('Minification complete.'.green))
  .catch((err) => console.error('Error during minification:'.red, err));
