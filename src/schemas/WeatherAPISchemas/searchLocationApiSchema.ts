import { z } from "zod";

// Define the schema for a single location object
export const searchLocationResultSchema = z.object({
    id: z.number(),
    name: z.string(),
    region: z.string().nullish(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    url: z.string().nullish(),
});

// Wrap it in an array and add a safe fallback default for failed/empty searches
export const searchLocationApiSchema = z
    .array(searchLocationResultSchema)
    .default([]);

// (Optional) Infer TypeScript types directly from the Zod schemas
export type LocationSearchResponse = z.infer<typeof searchLocationApiSchema>;
