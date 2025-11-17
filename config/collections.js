import { getCollectionConfigs } from "./utils/parse-pages-config.js";

// Generates collections for 11ty dynamically
export default function (eleventyConfig) {
  const collectionConfigs = getCollectionConfigs();

  // Dynamically generate collections from .pages.yml
  // collectionConfigs.forEach((config) => {
  //   const collectionName = config.name;
  //   const collectionPath = config.path;
  //   const sortBy = config.sortBy || "date"; // Default to sorting by date
  //   const sortOrder = config.sortOrder || "desc"; // desc or asc (newest first by default)

  //   eleventyConfig.addCollection(collectionName, function (collectionApi) {
  //     return collectionApi
  //       .getFilteredByGlob(`${collectionPath}/**/*.md`)
  //       .filter((item) => item.data.published !== false)
  //       .sort((a, b) => {
  //         let aVal, bVal;

  //         if (sortBy === "date") {
  //           aVal = a.date;
  //           bVal = b.date;
  //         } else {
  //           aVal = a.data[sortBy];
  //           bVal = b.data[sortBy];
  //         }

  //         if (typeof aVal === "string" && typeof bVal === "string") {
  //           return sortOrder === "asc"
  //             ? aVal.localeCompare(bVal)
  //             : bVal.localeCompare(aVal);
  //         } else if (aVal instanceof Date && bVal instanceof Date) {
  //           return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  //         } else {
  //           return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  //         }
  //       });
  //   });

  //   console.log(
  //     `[Collections] Added collection: ${collectionName} from ${collectionPath} (sorted by ${sortBy} ${sortOrder})`
  //   );
  // });

  // Fallback: If no collections found in .pages.yml, add default collections
  if (collectionConfigs.length === 0) {
    console.warn(
      "[Collections] No collections found in .pages.yml, using default collections"
    );
  }
}
