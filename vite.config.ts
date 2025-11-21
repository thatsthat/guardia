import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";
import { denyImports } from "vite-env-only";
import path from "path";

export default defineConfig({
  plugins: [
    denyImports({
      client: { files: ["**/.server/*", "**/*.server.*"] },
    }),
    tailwindcss(),
    tsconfigPaths(),
    reactRouterRSC(),
    rsc(),
    devtoolsJson(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
});
