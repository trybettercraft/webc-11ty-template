import sitemap from "@quasibit/eleventy-plugin-sitemap";
import site from "../../src/_data/site.json" with { type: "json" };

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: site.site,
    },
  });
}
