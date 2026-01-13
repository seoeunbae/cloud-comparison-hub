import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

// ESM 환경에서 __dirname을 안전하게 생성
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // process.cwd()를 사용하여 현재 작업 디렉토리에서 .env를 로드합니다.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
  
    resolve: {
      alias: {
        // @를 src 폴더로 매핑
        '@': resolve(__dirname, './src')
      },
    },

    // Cloud Run 환경(포트 8080) 대응을 위한 추가 설정 (선택사항)
    server: {
      host: true,
      port: 8080
    }
  };
});