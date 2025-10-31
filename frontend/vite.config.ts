import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // alias opzionale
    },
  },
  esbuild: {
    pure: process.env.NODE_ENV === "production" ? ["console.log"] : [],
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("chart.js") || id.includes("recharts")) {
              return "vendor_charts";
            }
            return "vendor"; 
          }
          // Chunk separato per utils e file di servizi
          if (
            id.includes("utils") ||
            id.includes("mappers") ||
            id.includes("services")
          ) {
            return "app_utilities";
          }
        },
      },
    },
  },
});
