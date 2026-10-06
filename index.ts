import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

interface Book {
  id: number;
  title: string;
  genre?: string;
  published_year?: number;
  author_id?: number;
}

interface Author {
  id: number;
  name: string;
}

interface BookQuery {
  genre?: string;
  sort?: string;
}

app.get('/', (req: Request, res: Response) => {
  res.send("Welcome to this Node.js and PostgreSQL app!");
});



app.get('/books', async (req: Request<{}, {}, {}, BookQuery>, res: Response) => {
  const { genre, sort } = req.query;
  const allowedSorts = ["title", "published_year", "genre"];

  let query = "SELECT * FROM books";
  const queryParams: any = [];

  if (genre) {
    queryParams.push(genre);
    query += ` WHERE genre = $${queryParams.length}`;
  }

  if (sort) {
    if (!allowedSorts.includes(sort)) {
      return res.status(400).send("Invalid sort parameter");
    }
    query += ` ORDER BY ${sort}`;
  }

  try {
    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});


app.get('/books/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }
  try {
    const result = await pool.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});



app.post('/books', async (req: Request<{}, {}, Partial<Book>>, res: Response) => {
  const { title, genre, published_year, author_id } = req.body;

  if (!title) {
    return res.status(400).send("Title is required");
  }
  try {
    const result = await pool.query(
      "INSERT INTO books (title, genre, published_year, author_id) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, genre, published_year, author_id]
    )
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    if (error.code === "23503") {
      return res.status(400).send("Invalid author_id: Author does not exist");
    }
    res.status(500).send(error.message);
  }
});



app.put('/books/:id', async (req: Request<{ id: string }, {}, Partial<Book>>, res: Response) => {
  const { id } = req.params;
  const { title, genre, published_year } = req.body;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }
  try {
    const result = await pool.query(
      "UPDATE books SET title = $1, genre = $2, published_year = $3 WHERE id = $4 RETURNING *",
      [title, genre, published_year, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).send(error.message);

  }
})


app.patch('/books/:id', async (req: Request<{ id: string }, {}, Partial<Book>>, res: Response) => {
  const { id } = req.params;
  const { title, genre, published_year } = req.body;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }

  if (!title && !genre && published_year === undefined) {
    return res.status(400).send("Request body cannot be empty");
  }

  try {
    const result = await pool.query(
      "UPDATE books SET title = COALESCE($1, title), genre = COALESCE($2, genre), published_year = COALESCE($3, published_year) WHERE id = $4 RETURNING *",
      [title, genre, published_year, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});


app.delete('/books/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }
  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.send("Book deleted successfully!");

  } catch (error: any) {
    res.status(500).send(error.message);
  }
});





// --- Author routes ---



app.get('/authors', async (req: Request, res: Response) => {

  try {
    const result = await pool.query("SELECT * FROM authors");

    res.json(result.rows);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});



app.post('/authors', async (req: Request<{}, {}, Partial<Author>>, res: Response) => {
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
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});



app.get('/authors/:id/books', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }

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
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});