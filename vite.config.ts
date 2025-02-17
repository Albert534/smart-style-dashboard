import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
/// <reference types="vite/types/importMeta.d.ts" />
/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
});
