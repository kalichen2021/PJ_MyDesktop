import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";


const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [vue()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 5174,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@comp": "/src/comp",
      "@widget": "/src/comp/widget",
      "@utils": "/src/utils",
      "@store": "/src/store",
    },
  },
  test: {
    // global: true,
    environment: "happy-dom",
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  }
}));
