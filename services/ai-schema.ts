import { z } from "zod";

export const generatedFileSchema = z.object({
  path: z.string(),
  code: z.string(),
  language: z.string(),
});

export const generatedProjectSchema = z.object({
  files: z.array(generatedFileSchema),
  dependencies: z.record(z.string(), z.string()).optional(),
});

export type GeneratedFile = z.infer<
  typeof generatedFileSchema
>;

export type GeneratedProject = z.infer<
  typeof generatedProjectSchema
>;
