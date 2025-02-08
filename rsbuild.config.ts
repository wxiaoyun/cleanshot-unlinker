import { defineConfig } from "@rsbuild/core";
import path from "node:path";

export default defineConfig({
  source: {
    entry: {
      cli: path.resolve(__dirname, "main.ts"),
    },
  },
  output: {
    target: "node",
    distPath: {
      root: path.resolve(__dirname, "npm", "bin"),
      js: "",
    },
    filename: {
      js: "[name].cjs",
    },
  },
  tools: {
    rspack: (config, { rspack }) => {
      config.plugins?.push(
        new rspack.BannerPlugin({
          banner: "#!/usr/bin/env node",
          raw: true,
          entryOnly: true,
        }),
      );
      return config;
    },
  },
});
