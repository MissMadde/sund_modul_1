import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title needs to include at least 1 character" })
    .max(50, { message: "Title needs to include at most 50 characters" }),
  genre: z.string().min(2).max(50).optional(),
  published_year: z.number().int().min(1700).max(2030).optional(),
  author_id: z.number().int().positive().optional(),
});


export type BookInput = z.infer<typeof bookSchema>;
export type Book = BookInput & { id: number };


export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const bookPatchSchema = bookSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be sent" }
);

export const bookQuerySchema = z.object({
  genre: z.string().optional(),
  sort: z.enum(["title", "genre", "published_year"]).optional(),
});

export type BookQuery = z.infer<typeof bookQuerySchema>;