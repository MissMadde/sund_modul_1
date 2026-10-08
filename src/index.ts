import express, { type Request, type Response } from "express";
import { pool } from "./db.js";
import { env } from "./env.js";
import { z } from "zod";
import { bookSchema, idParamSchema, bookPatchSchema, bookQuerySchema, type Book, type BookQuery } from "./schemas.js";


const app = express();
const PORT = env.PORT || 3000;

app.use(express.json());


interface Author {
  id: number;
  name: string;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to this Node.js and PostgreSQL app!");
});



app.get("/books", async (req: Request<Record<string, never>, unknown, unknown, BookQuery>, res: Response) => {
  const parsedQuery = bookQuerySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    return res.status(400).json({ error: z.flattenError(parsedQuery.error) });
  }

  const { genre, sort } = parsedQuery.data;

  let query = "SELECT * FROM books";
  const queryParams: string[] = [];

  if (genre) {
    queryParams.push(genre);
    query += ` WHERE genre = $${queryParams.length}`;
  }

  if (sort) {
    query += ` ORDER BY ${sort}`;
  }

  try {
    const result = await pool.query<Book>(query, queryParams);
    res.json(result.rows);
  } catch (error) {
   res.status(500).send(getErrorMessage(error));
  }
});


app.get("/books/:id", async (req: Request<{ id: string }>, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({ error: z.flattenError(parsedParams.error) });
  }

  const { id } = parsedParams.data;

  try {
    const result = await pool.query<Book>(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});



app.post("/books", async (req: Request<Record<string, never>, unknown, Partial<Book>>, res: Response) => {
  const validatedBook = bookSchema.safeParse(req.body);

  if (!validatedBook.success) {
    return res.status(400).json({ error: z.flattenError(validatedBook.error) });
  }

  const { title, genre, published_year, author_id } = validatedBook.data;
  try {
    const result = await pool.query<Book>(
      "INSERT INTO books (title, genre, published_year, author_id) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, genre, published_year, author_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "23503") {
      return res.status(400).send("Invalid author_id: Author does not exist");
    }
    res.status(500).send(getErrorMessage(error));
  }
});



app.put("/books/:id", async (req: Request<{ id: string }, Record<string, never>, Partial<Book>>, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({ error: z.flattenError(parsedParams.error) });
  }

  const { id } = parsedParams.data;

  const validatedBook = bookSchema.safeParse(req.body);

  if (!validatedBook.success) {
    return res.status(400).json({ error: z.flattenError(validatedBook.error) });
  }

  const { title, genre, published_year } = validatedBook.data;
  try {
    const result = await pool.query<Book>(
      "UPDATE books SET title = $1, genre = $2, published_year = $3 WHERE id = $4 RETURNING *",
      [title, genre, published_year, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});


app.patch("/books/:id", async (req: Request<{ id: string }, Record<string, never>, Partial<Book>>, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({ error: z.flattenError(parsedParams.error) });
  }

  const { id } = parsedParams.data;
  const validatedBody = bookPatchSchema.safeParse(req.body);
  if (!validatedBody.success) {
    return res.status(400).json({ error: z.flattenError(validatedBody.error) });
  }

  const { title, genre, published_year, author_id } = validatedBody.data;

  try {
    const result = await pool.query<Book>(
      "UPDATE books SET title = COALESCE($1, title), genre = COALESCE($2, genre), published_year = COALESCE($3, published_year), author_id = COALESCE($5, author_id) WHERE id = $4 RETURNING *",
      [title, genre, published_year, id, author_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});


app.delete("/books/:id", async (req: Request<{ id: string }>, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({ error: z.flattenError(parsedParams.error) });
  }

  const { id } = parsedParams.data;
  try {
    const result = await pool.query<Book>(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.send("Book deleted successfully!");

  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});





// --- Author routes ---



app.get("/authors", async (req: Request, res: Response) => {

  try {
    const result = await pool.query("SELECT * FROM authors");

    res.json(result.rows);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});



app.post("/authors", async (req: Request<Record<string, never>, unknown, Partial<Author>>, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Name is required");
  }

  try {
    const result = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});



app.get("/authors/:id/books", async (req: Request<{ id: string }>, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({ error: z.flattenError(parsedParams.error) });
  }

  const { id } = parsedParams.data;
  try {
    const authorCheck = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);
    if (authorCheck.rows.length === 0) {
      return res.status(404).send("Author not found");
    }

    const result = await pool.query(
      "SELECT books.* FROM books JOIN authors ON books.author_id = authors.id WHERE authors.id = $1",
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});