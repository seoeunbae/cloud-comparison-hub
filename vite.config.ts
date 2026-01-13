import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(import.meta.env.GEMINI_API_KEY),
      // Expose all VITE_ prefixed environment variables to client-side code
      ...Object.fromEntries(
        Object.entries(env)
          .filter(([key]) => key.startsWith('VITE_'))
          .map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)])
      ),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
    },
  };
});
