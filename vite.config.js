import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `--mode singlefile` erzeugt eine einzelne HTML-Datei (alles inline) in .preview-build/.
// scripts/build-static-preview.mjs rendert sie anschließend zu reinem HTML+CSS
// ohne JavaScript vor – so öffnet sich preview/index.html auch lokal auf iOS.
export default defineConfig(({ mode }) => {
  const singleFile = mode === 'singlefile'
  return {
    plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
    build: singleFile
      ? { outDir: '.preview-build', assetsInlineLimit: 100_000_000, emptyOutDir: true }
      : { outDir: 'dist', chunkSizeWarningLimit: 1000 }, // Three.js wird per lazy() separat geladen
  }
})
