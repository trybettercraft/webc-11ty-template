import fs from "fs";
import path from "path";

import cssnano from "cssnano";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

export default function (eleventyConfig) {
  //compile tailwind before eleventy processes the files
  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./src/tailwind/index.css");

    const tailwindOutputPath = "./src/assets/styles/index.css";

    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  eleventyConfig.addTransform(
    "inject-css-link",
    function (content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        return content.replace(
          /<\/head>/,
          '<link rel="stylesheet" href="/assets/styles/index.css"></head>',
        );
      }
      return content;
    },
  );

  const processor = postcss([
    //compile tailwind
    tailwindcss(),

    //minify tailwind css
    cssnano({ preset: "default" }),
  ]);

  return {
    dir: { input: "src", output: "dist" },
  };
}
