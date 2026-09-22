import fs from 'node:fs';
import path from 'node:path';
import { ZipArchive } from 'archiver';

const inputDir = path.resolve(import.meta.dirname, 'package/dist');
// The ZIP is the ready-to-use full distribution. Optional CSS stays in npm/CDN files.
const archiveStyles = new Set(['styles/index.css', 'styles/layout.css', 'styles/themes/light.css', 'styles/themes/dark.css', 'styles/themes/slate-light.css']);

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
          const name = path.relative(sourceDir, filePath).split(path.sep).join('/');
          if (path.extname(file) === '.css' && !archiveStyles.has(name)) return;
          archive.file(filePath, { name });
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
