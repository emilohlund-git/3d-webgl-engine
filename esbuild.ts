import esbuild = require("esbuild");
import { copy } from "esbuild-plugin-copy";
import { glsl } from "esbuild-plugin-glsl";

async function watch() {
  let ctx = await esbuild.context({
    entryPoints: ["src/main.ts"],
    bundle: true,
    platform: "node",
    outdir: "dist",

    loader: {
      ".png": "file",
      ".wav": "file",
      ".vert": "file",
      ".frag": "file"
    },
    external: ["readline/promises"],
    plugins: [
      glsl({
        minify: true,
      }),
      copy({
        resolveFrom: 'cwd',
        assets: {
          from: ['./src/shaders/*'],
          to: ['./dist/shaders'],
        },
        watch: true,
      }),
    ],
  });
  await ctx.watch();
  console.log("Watching..");
}
watch();
