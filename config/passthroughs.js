export default function (eleventyConfig) {
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/media");
  eleventyConfig.addPassthroughCopy({
    "node_modules/alpinejs/dist/cdn.min.js": "assets/js/alpine.min.js",
  });

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/");
}
