import { defineConfig } from 'tsup';

export default defineConfig({
  target: 'node20.3.1',
  entry: ['./src/index.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: false,
  format: ['cjs'],
  external: [],
  clean: true,
  minify: true,
  tsconfig: './tsconfig.build.json'
});
