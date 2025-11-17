// Import configuration modules
import collections from "./config/collections.js";
import filters from "./config/filters.js";
import passthroughs from "./config/passthroughs.js";
import sitemap from "./config/plugins/sitemap.js";

// Dynamic plugin loading
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginsDir = path.join(__dirname, "config/plugins");
const pluginFiles = fs
  .readdirSync(pluginsDir)
  .filter((file) => file.endsWith(".js"));

export default async function (eleventyConfig) {
  for (const file of pluginFiles) {
    const pluginPath = path.join(pluginsDir, file);
    const plugin = await import(pluginPath);
    plugin.default(eleventyConfig);
  }

  collections(eleventyConfig);
  filters(eleventyConfig);
  passthroughs(eleventyConfig);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html", "liquid", "txt"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
