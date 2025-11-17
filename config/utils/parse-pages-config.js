import { readFileSync } from "fs";
import { parse } from "yaml";

/**
 * Parse the .pages.yml configuration file
 * @returns {Object} Parsed configuration object
 */
export function parsePagesConfig() {
  try {
    const configPath = ".pages.yml";
    const fileContents = readFileSync(configPath, "utf8");
    return parse(fileContents);
  } catch (error) {
    console.warn("Warning: Could not parse .pages.yml file:", error.message);
    return { content: [] };
  }
}

/**
 * Get collection configurations from .pages.yml
 * @returns {Array} Array of collection configurations
 */
export function getCollectionConfigs() {
  const config = parsePagesConfig();

  if (!config.content || !Array.isArray(config.content)) {
    return [];
  }

  // Filter for collection types only (not file types)
  return config.content.filter((item) => item.type === "collection");
}
