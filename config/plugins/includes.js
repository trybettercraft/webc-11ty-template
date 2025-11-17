import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

export default function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("inc", async (filePath) => {
    const raw = await fs.readFile(filePath, "utf8");
    return matter(raw).content; // strips YAML/TOML FM
  });
}
