import { readFileSync } from "node:fs";
import { join as joinPath } from "node:path";

export const fixture = (path: string): string => {
  if (!import.meta.root) {
    const cwd = process.cwd();

    console.warn(`
warn: import.meta.root is not defined (vite sets it on tests) to be set
    current dir (${cwd}) will be used as root
    `);

    return readFileSync(joinPath(cwd, 'fixtures', ...path.split('/'))).toString('utf-8');
  }

  return readFileSync(joinPath(import.meta.root, 'tests', 'fixtures', ...path.split('/'))).toString('utf-8');
}