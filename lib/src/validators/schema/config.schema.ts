import { z } from "zod";

export const configSchema = z.object({
  name: z.string(),
  description: z.string(),
  headers: z.record(z.string(), z.unknown()),
  testDir: z.string(),
  reportDir: z.string(),
});

export type ConfigType = z.infer<typeof configSchema>;
