import express, { Request, Response } from "express";
import "./db.js";
import Book from "./models/Book.js";
import Author from "./models/Author.js";

const app = express();
app.use(express.json());
const PORT = 3000;


function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}



app.get("/books", async (req: Request, res: Response) => {
  try {
    const { genre, sort, page = 1, limit = 5 } = req.query;

    const filter: Record<string, any> = {};
    if (genre) {
      filter.genre = genre;
    }

    let sortOption: Record<string, 1 | -1> = {};
    if (typeof sort === "string") {
      sortOption[sort] = 1;
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Book.countDocuments(filter);
    const data = await Book.find(filter)
      .populate("author")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.json({
      page: pageNum,
      limit: limitNum,
      total,
      data
    });
  } catch (error: unknown) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});



app.post("/books", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({ error: "A book with this title already exists" });
    }

    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string };
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: getErrorMessage(error) });
  }
});



app.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error: unknown) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});



app.put("/books/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string };
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: getErrorMessage(error) });
  }
});



app.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted", book: deletedBook });
  } catch (error: unknown) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});




// ---- Author ----



app.get("/authors", async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error: unknown) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});



app.post("/authors", async (req: Request, res: Response) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string };
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: getErrorMessage(error) });
  }
});



app.get("/authors/:id/books", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    const books = await Book.find({ author: id }).populate("author");
    res.json({ author, books });
  } catch (error: unknown) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});