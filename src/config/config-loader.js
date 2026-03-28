import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";
import { ConfigSchema } from "./config-schema.js";
import { DEFAULT_CONFIG } from "./default-config.js";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }

  const result = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (Array.isArray(value)) {
      result[key] = value;
      continue;
    }

    if (isPlainObject(value) && isPlainObject(base[key])) {
      result[key] = deepMerge(base[key], value);
      continue;
    }

    result[key] = value;
  }

  return result;
}

function parseConfigContent(content, filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".yaml" || ext === ".yml") {
    return yaml.parse(content) ?? {};
  }

  if (ext === ".json") {
    return JSON.parse(content);
  }

  throw new Error(
    `Unsupported config file extension: ${ext}. Use .yaml, .yml, or .json.`
  );
}

function formatValidationError(error) {
  return error.issues
    .map((issue) => {
      const location = issue.path.length > 0 ? issue.path.join(".") : "config";
      return `- ${location}: ${issue.message}`;
    })
    .join("\n");
}

async function resolveConfigPath(inputPath) {
  if (inputPath) {
    return path.resolve(process.cwd(), inputPath);
  }

  const candidates = [
    "seed.config.yaml",
    "seed.config.yml",
    "seed.config.json",
  ];

  for (const candidate of candidates) {
    const resolved = path.resolve(process.cwd(), candidate);
    try {
      await fs.access(resolved);
      return resolved;
    } catch {
      // keep looking
    }
  }

  return null;
}

export async function loadConfig(inputPath = null) {
  const configPath = await resolveConfigPath(inputPath);

  if (!configPath) {
    throw new Error(
      "No config file found. Create one with `seed init` or pass --config <path>."
    );
  }

  const rawContent = await fs.readFile(configPath, "utf8");
  const parsedContent = parseConfigContent(rawContent, configPath);
  const mergedConfig = deepMerge(DEFAULT_CONFIG, parsedContent);

  const result = ConfigSchema.safeParse(mergedConfig);

  if (!result.success) {
    throw new Error(`Invalid config file:\n${formatValidationError(result.error)}`);
  }

  return {
    path: configPath,
    config: result.data,
  };
}