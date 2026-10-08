import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build:preview` erzeugt eine einzelne, eigenständige HTML-Datei
// (alle Skripte, Styles und Bilder inline) für die Vorschau in /preview.
export default defineConfig(({ mode }) => {
  const singleFile = mode === 'singlefile'
  return {
    plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
    build: singleFile
      ? { outDir: 'preview', assetsInlineLimit: 100_000_000, emptyOutDir: false }
      : { outDir: 'dist', chunkSizeWarningLimit: 1000 }, // Three.js wird per lazy() separat geladen
  }
})
