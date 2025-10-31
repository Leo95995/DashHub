import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // alias per importazioni più pulite (TODO - per ora non le uso)
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    // "console.warn", "console.error" volendo potrei 
    // togliere anche queste ma in env di production sono utili per debug
    pure:
      process.env.NODE_ENV === "production"
        ? ["console.log"]
        : [],
  },
  build: {
    minify: "esbuild",

    rollupOptions: {
      output: {
        // questa configurazione mi permette di dare valori dinamici ai bundle ->
        // mi serve per la cache. se non vede il file fresco cerca il file vecchio e si rompe la ui
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,

        // questo mi serve per splittare i chunk
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Faccio dei chunk per le librerie più grandi e pesanti
            if (
              id.includes("react") ||
              id.includes("redux") ||
              id.includes("zustand")
            ) {
              return "vendor_react_state";
            }
            if (id.includes("chart.js") || id.includes("recharts")) {
              return "vendor_charts";
            }
            return "vendor";
          }
          // chunk separato per tutti i file che non sono tsx e che sono di utils per me
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
