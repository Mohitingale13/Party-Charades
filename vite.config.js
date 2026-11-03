import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: fs.realpathSync(process.cwd()),
})
