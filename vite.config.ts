import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './cloud-comparison-hub/src')
      },
    },
  };
});
