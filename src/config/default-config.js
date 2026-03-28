export const DEFAULT_CONFIG = {
  version: 1,
  database: {
    client: "postgresql",
    url: "",
  },
  seed: {
    defaultRows: 10,
    dryRun: false,
    batchSize: 500,
    previewRows: 10,
  },
  tables: {},
};