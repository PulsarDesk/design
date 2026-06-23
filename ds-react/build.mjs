// build.mjs — bundle src/index.ts → dist/index.js (ESM IIFE-friendly).
// react + the JSX runtime stay EXTERNAL: the claude.ai/design converter re-bundles
// this entry and shims `react`/`react/jsx-runtime` to window.React, so a second
// React instance must never be inlined here.
import { build } from 'esbuild';

await build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  logLevel: 'info',
});

console.log('✓ dist/index.js');
