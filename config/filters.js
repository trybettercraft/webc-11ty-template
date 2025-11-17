export default function (eleventyConfig) {
  // Date filters for templates
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Limit filter for limiting array items
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });
}
