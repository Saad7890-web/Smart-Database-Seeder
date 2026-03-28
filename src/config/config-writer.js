import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";
import { DEFAULT_CONFIG } from "./default-config.js";

function starterConfigText() {
  return `# Smart DB Seeder configuration
version: 1

database:
  client: postgresql
  url: postgresql://postgres:postgres@localhost:5432/smart_db_seeder

seed:
  defaultRows: 10
  dryRun: false
  batchSize: 500
  previewRows: 10

tables: {}
`;
}

export async function writeStarterConfig(targetPath, { force = false } = {}) {
  const resolvedPath = path.resolve(process.cwd(), targetPath);

  try {
    await fs.access(resolvedPath);
    if (!force) {
      throw new Error(
        `Config file already exists at ${resolvedPath}. Use --force to overwrite it.`
      );
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await fs.writeFile(resolvedPath, starterConfigText(), "utf8");

  return resolvedPath;
}

export function getDefaultConfigObject() {
  return DEFAULT_CONFIG;
}

export function getDefaultConfigYaml() {
  return yaml.stringify(DEFAULT_CONFIG);
}