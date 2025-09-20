import { z } from "zod";

// Yasunori entry field definitions
export const yasunoriEntryFields = {
  id: z.number().int().nonnegative().describe("Awesome Yasunori ID"),
  title: z.string().describe("Title of the entry"),
  date: z.string().describe("ISO formatted date of the entry"),
  at: z.string().describe("Where the entry was recorded"),
  senpan: z.string().describe("Who reported the entry"),
  content: z.string().describe("Main content of the entry"),
  meta: z
    .string()
    .nullable()
    .optional()
    .describe("Optional metadata for the entry"),
} satisfies Record<string, z.ZodTypeAny>;

// Yasunori entry schema
export const YasunoriEntrySchema = z.object(yasunoriEntryFields);
export type YasunoriEntry = z.infer<typeof YasunoriEntrySchema>;

// Search result entry schema
export const SearchResultEntrySchema = z.object({
  id: z.string().describe("Entry ID as string"),
  title: z.string(),
  date: z.string(),
  at: z.string(),
  senpan: z.string(),
  content: z.string(),
  meta: z.string().nullable().optional(),
});
export type SearchResultEntry = z.infer<typeof SearchResultEntrySchema>;
