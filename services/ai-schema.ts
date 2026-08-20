import { z } from "zod";

export const generatedFileSchema = z.object({
  path: z.string(),
  code: z.string(),
});

export const generatedProjectSchema = z.object({
  title: z.string(),
  prompt: z.string(),
  files: z.array(generatedFileSchema),
});

export type GeneratedFile = z.infer<typeof generatedFileSchema>;
export type GeneratedProject = z.infer<typeof generatedProjectSchema>;