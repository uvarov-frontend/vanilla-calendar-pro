import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

// Install the actual tarball without consulting the registry or the source aliases.
export async function unpackPackage(root, directory) {
  const result = JSON.parse(
    execFileSync('pnpm', ['--dir', path.join(root, 'package/dist'), 'pack', '--json', '--pack-destination', directory], { encoding: 'utf8' }),
  );
  execFileSync('tar', ['-xf', path.join(directory, path.basename(result.filename)), '-C', directory]);
  await fs.mkdir(path.join(directory, 'node_modules'), { recursive: true });
  const packed = path.join(directory, 'node_modules/vanilla-calendar-pro');
  await fs.rename(path.join(directory, 'package'), packed);
  await fs.writeFile(path.join(directory, 'package.json'), '{"private":true,"type":"module"}');
  return { packed, files: result.files.map(({ path: name }) => name) };
}
