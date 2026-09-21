import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { ZipArchive } from 'archiver';
import cssnano from 'cssnano';
import postcss from 'postcss';
import { minify as minifyJs } from 'terser';

const inputDir = path.resolve(import.meta.dirname, 'package/dist');

const logMessage = (type, file, originalSize, minifiedSize, gzipSize) => {
  const sizeToKb = (size) => Math.round((size / 1024) * 100) / 100;
  const originalSizeKb = sizeToKb(originalSize);
  const minifiedSizeKb = sizeToKb(minifiedSize);
  const gzipSizeKb = sizeToKb(gzipSize);

  console.log(`Minified ${type}: ${file} | ${originalSizeKb} kB → ${minifiedSizeKb} kB (gzip: ${gzipSizeKb} kB)`);
};

const getGzipSize = (content) => gzipSync(content).length;

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
    throw new Error(`Error minifying ${path.basename(filePath)}`, { cause: e });
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
        await minifyFile(filePath, (content) => minifyJs(content, { ecma: 2015, module: file.endsWith('.mjs'), safari10: true }));
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
  const archive = new ZipArchive({ zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`Archive created: ${outputZipPath} (${(archive.pointer() / 1024).toFixed(2)} kB)`);
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
    console.log('Minification complete.');
    await zipDirectory(inputDir);
    console.log('Archiving complete.');
  } catch (err) {
    console.error('Error during processing:', err);
    process.exitCode = 1;
  }
};

main();
