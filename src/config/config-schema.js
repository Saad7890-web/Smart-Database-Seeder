import { z } from "zod";

export const ColumnRuleSchema = z.object({
  unique: z.boolean().optional(),
  nullable: z.boolean().optional(),
  type: z.string().optional(),
  values: z.array(z.any()).optional(),
  weight: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  format: z.string().optional(),
  default: z.any().optional(),
  reference: z
    .object({
      table: z.string(),
      column: z.string(),
    })
    .optional(),
});

export const TableConfigSchema = z.object({
  enabled: z.boolean().optional(),
  rows: z.number().int().nonnegative().optional(),
  columns: z.record(ColumnRuleSchema).optional(),
});

export const ConfigSchema = z
  .object({
    version: z.literal(1).default(1),
    database: z.object({
      client: z.enum(["postgresql", "mysql", "sqlite"]),
      url: z.string().optional(),
      filename: z.string().optional(),
    }),
    seed: z
      .object({
        defaultRows: z.number().int().positive().default(10),
        dryRun: z.boolean().default(false),
        batchSize: z.number().int().positive().default(500),
        previewRows: z.number().int().positive().default(10),
      })
      .default({}),
    tables: z.record(TableConfigSchema).default({}),
  })
  .superRefine((config, ctx) => {
    if (config.database.client === "sqlite") {
      if (!config.database.filename) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["database", "filename"],
          message: "filename is required when database.client is sqlite",
        });
      }
    } else {
      if (!config.database.url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["database", "url"],
          message: "url is required when database.client is postgresql or mysql",
        });
      }
    }
  });