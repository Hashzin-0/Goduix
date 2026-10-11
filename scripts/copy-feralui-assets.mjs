import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const modules = join(root, '..', 'node_modules');
const publicDir = join(root, '..', 'public');
mkdirSync(publicDir, { recursive: true });

function copyIfPresent(from, to) {
  if (!existsSync(from)) return;
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true, force: true });
}

// Original packages ship these assets separately from their React entry points.
copyIfPresent(join(modules, 'playcaptcha', 'assets', 'toys'), join(publicDir, 'toys'));
copyIfPresent(join(modules, 'playcaptcha', 'assets', 'playcaptcha.svg'), join(publicDir, 'playcaptcha.svg'));
copyIfPresent(join(modules, 'playcaptcha', 'playcaptcha.svg'), join(publicDir, 'playcaptcha.svg'));
copyIfPresent(join(modules, 'deskfolio', 'public'), publicDir);
