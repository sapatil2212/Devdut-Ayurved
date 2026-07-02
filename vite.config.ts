import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    // tanstackStart already bundles TanStackRouterVite + code-splitting internally.
    // Do NOT add TanStackRouterVite separately or it will conflict.
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ],
  resolve: {
    // Native tsconfig path aliases (Vite 8+), replaces vite-tsconfig-paths plugin.
    tsconfigPaths: true,
  },
  optimizeDeps: {
    // Force Vite to pre-bundle these CJS packages so their default export
    // is correctly unwrapped in both client and SSR environments.
    include: ["react-countup", "countup.js"],
  },
});
