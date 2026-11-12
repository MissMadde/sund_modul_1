import { z } from "zod";

const catalogue = {
  dune: { title: "dune", copiesAvailable: 3},
  neuromancer: { title: "neuromancer", copiesAvaliable: 1 },
  foundation: { title: "foundation", copiesAvailable: 0 },
};

export const BookTitleSchema = z.enum(["dune", "neuromancer", "foundation"]);

export const BookSchema = z.object({
  title: BookTitleSchema,
  copiesAvailable: z.number().int().nonnegative(),
});

export type Book = z.infer<typeof BookSchema>;

export const findBook = (title: unknown): Book => {
  const bookTitle = BookTitleSchema.parse(title);
  return BookSchema.parse(catalogue[bookTitle]);
}


export const checkOutBook = (book: unknown): number => {
  const validBook = BookSchema.parse(book);

  if (validBook.copiesAvailable === 0) {
    throw new Error("No copies available");
  }

  const loanId = Math.floor(Math.random() * 9000) + 1000;
  return loanId;
};
