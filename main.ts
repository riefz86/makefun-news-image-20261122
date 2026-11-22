// World news poster for Sunday 22 November 2026 (Node 22, standard library only).
// The poster image lives beside this file; the program copies it to the
// output path the harness expects. Deterministic: same input, same bytes.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dst = join(outDir, 'entry.png');

copyFileSync(src, dst);
const size = statSync(dst).size;
if (size > 1_048_576) {
  console.error(`entry.png is over the 1 MiB gate: ${size} bytes`);
  process.exit(1);
}
const head = readFileSync(dst).subarray(0, 8);
if (head.toString('hex') !== '89504e470d0a1a0a') {
  console.error('entry.png is not a PNG file');
  process.exit(1);
}
console.log(`wrote ${dst} (${size} bytes)`);
