/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { minify: minifyJs } = require('terser');
const postcss = require('postcss');
const cssnano = require('cssnano');
const pako = require('pako');
const archiver = require('archiver');
require('colors');

const inputDir = path.resolve(__dirname, 'package/dist');

const logMessage = (type, file, originalSize, minifiedSize, gzipSize) => {
  const sizeToKb = (size) => Math.round((size / 1024) * 100) / 100;
  const originalSizeKb = sizeToKb(originalSize);
  const minifiedSizeKb = sizeToKb(minifiedSize);
  const gzipSizeKb = sizeToKb(gzipSize);

  console.log(`Minified ${type}: `.gray + `${file}`.blue + ' | ' + `${originalSizeKb} kB → ${minifiedSizeKb} kB `.green + `(gzip: ${gzipSizeKb} kB)`.magenta);
};

const getGzipSize = (content) => Buffer.byteLength(pako.gzip(content));

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

const zipDirectory = async (sourceDir) => {
  const outputZipPath = path.join(sourceDir, 'package.zip');

  if (fs.existsSync(outputZipPath)) fs.unlinkSync(outputZipPath);

  const output = fs.createWriteStream(outputZipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`Archive created: ${outputZipPath.green}`.blue + ` (${(archive.pointer() / 1024).toFixed(2)} kB)`.green);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    function addFilesToArchive(dir) {
      fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          addFilesToArchive(filePath);
        } else if (stat.isFile() && path.extname(file) !== '.zip') {
          archive.file(filePath, { name: path.relative(sourceDir, filePath) });
        }
      });
    }

    addFilesToArchive(sourceDir);
    archive.finalize();
  });
};

const main = async () => {
  try {
    await processDirectory(inputDir);
    console.log('Minification complete.'.green);
    await zipDirectory(inputDir);
    console.log('Archiving complete.'.green);
  } catch (err) {
    console.error('Error during processing:'.red, err);
  }
};

main();
