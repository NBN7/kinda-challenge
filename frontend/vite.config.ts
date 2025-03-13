import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:5000", // proxy para las solicitudes a la api
    },
  },
  resolve: {
    alias: {
      "@": "/src", // alias para las importaciones desde la carpeta 'src'
    },
  },
});
