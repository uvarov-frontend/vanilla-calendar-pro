import fs from 'node:fs';
import path from 'node:path';
import { ZipArchive } from 'archiver';

const inputDir = path.resolve(import.meta.dirname, 'package/dist');

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

    output.on('error', reject);
    archive.on('error', reject);
    archive.on('warning', reject);

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
    await zipDirectory(inputDir);
    console.log('Archiving complete.');
  } catch (err) {
    console.error('Error during processing:', err);
    process.exitCode = 1;
  }
};

main();
