import * as Sentry from "@sentry/node";
import "./instrument.js";

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./sequelize.js";
import Book from "./models/book.js";
import Author from "./models/author.js";
import Member from "./models/member.js";
import Loan from "./models/loan.js";
import reportError from "./utils/reportError.js";

dotenv.config();


const app = express();


const PORT = process.env.PORT;

app.use(express.json());

Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });

Member.belongsToMany(Book, { through: Loan, foreignKey: 'member_id', otherKey: 'book_id' });
Book.belongsToMany(Member, { through: Loan, foreignKey: 'book_id', otherKey: 'member_id' });

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully!");

    await sequelize.sync();
    console.log("Database synchronized successfully.");

  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
};



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


app.get("/", function rootHandler(req: Request, res: Response) {
  res.end("Hello world!");
});

app.get("/debug-sentry", function mainHandler(req: Request, res: Response) {
  throw new Error("My first Sentry error!");
});


app.get('/books', async (req: Request<{}, {}, {}, BookQuery>, res: Response) => {
  const { genre, sort } = req.query;
  const allowedSorts = ["title", "published_year", "genre"];

  Sentry.addBreadcrumb({
    message: "Fetching books list",
    level: "info",
  });
  Sentry.setTag("feature", "books");


  const options: any = {
    include: [
      {
        model: Author,
        attributes: ['name'],
        foreignKey: 'author_id',
      },
    ],
  };

  if (genre) {
    options.where = { genre };
  }

  if (sort) {
    if (!allowedSorts.includes(sort)) {
      return res.status(400).send("Invalid sort parameter");
    }
    options.order = [[sort, 'ASC']];
  }

  try {
    const books = await Book.findAll(options);
    res.json(books);
  } catch (error: any) {
    console.error(error);
    reportError(error, "books");
    res.status(500).send("Internal Server Error");
  }
});


app.get('/books/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  Sentry.addBreadcrumb({
    message: "Fetching a book by ID",
    level: "info",
  });
  Sentry.setTag("feature", "books");

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number please please.");
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book);
  } catch (error: any) {
    console.error(error);
    reportError(error, "books");
    res.status(500).send("Internal Server Error");
  }
});



app.post('/books', async (req: Request, res: Response) => {
  const { title, genre, published_year, author_id } = req.body;

  Sentry.addBreadcrumb({
    message: "Creating a new book",
    level: "info",
  });
  Sentry.setTag("feature", "books");

  if (!title) {
    return res.status(400).send("Title is required really");
  }

  try {
    const newBook = await Book.create({
      title,
      genre,
      published_year,
      author_id,
    });
    res.status(201).json(newBook);
  } catch (error: any) {
    // instead of the sql error code 23503
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send("Invalid author_id: Author does not exist");
    }
    console.error(error);
    reportError(error, "books");
    res.status(500).send("Internal Server Error");
  }
});



app.put('/books/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { title, genre, published_year, author_id } = req.body;

  Sentry.addBreadcrumb({
    message: "Update a book",
    level: "info",
  });
  Sentry.setTag("feature", "books");

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }

  if (!title) {
    return res.status(400).send("Title is required");
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    await book.update({ title, genre, published_year, author_id });
    res.json(book);
  } catch (error: any) {
    console.error(error);
    reportError(error, "books");
    res.status(500).send("Internal Server Error");
  }
});




app.delete('/books/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  Sentry.addBreadcrumb({
    message: "Delete a book",
    level: "info",
  });
  Sentry.setTag("feature", "books");

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    await book.destroy();
    res.send("Book deleted successfully!");
  } catch (error: any) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).send("Cannot delete book because it is associated with active loans.");
    }
    console.error(error);
    reportError(error, "books");
    res.status(500).send("Internal Server Error");
  }
});





// --- Author routes ---



app.get('/authors', async (req: Request, res: Response) => {

  Sentry.addBreadcrumb({
    message: "Fetching authors list",
    level: "info",
  });
  Sentry.setTag("feature", "authors");

  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error: any) {
    console.error(error);
    reportError(error, "authors");
    res.status(500).send("Internal Server Error");
  }
});


app.post('/authors', async (req: Request<{}, {}, Partial<Author>>, res: Response) => {
  const { name } = req.body;

  Sentry.addBreadcrumb({
    message: "Create a new author",
    level: "info",
  });
  Sentry.setTag("feature", "authors");

  if (!name) {
    return res.status(400).send("Name is required");
  }

  try {
    const newAuthor = await Author.create({ name });
    res.status(201).json(newAuthor);
  } catch (error: any) {
    console.error(error);
    reportError(error, "authors");
    res.status(500).send("Internal Server Error");
  }
});


app.get('/authors/:id/books', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  Sentry.addBreadcrumb({
    message: "Fetch all books from Author by ID",
    level: "info",
  });
  Sentry.setTag("feature", "authors");

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }

  try {
    const author = await Author.findByPk(id, {
      include: [Book],
    });

    if (!author) {
      return res.status(404).send("Author not found");
    }

    res.json(author);
  } catch (error: any) {
    console.error(error);
    reportError(error, "authors");
    res.status(500).send("Internal Server Error");
  }
});


// --- Loans ---


app.post('/loans', async (req: Request, res: Response) => {
  const { member_id, book_id } = req.body;

  Sentry.addBreadcrumb({
    message: "Create a new loan",
    level: "info",
  });
  Sentry.setTag("feature", "loans");

  if (!member_id || !book_id) {
    return res.status(400).send("member_id and book_id are required");
  }

  try {
    const newLoan = await Loan.create({
      member_id,
      book_id,
      loan_date: new Date(),
    });
    res.status(201).json(newLoan);
  } catch (error: any) {
    console.error(error);
    reportError(error, "loans");
    res.status(500).send("Internal Server Error");
  }
});



// --- members ---


app.get('/members/:id/loans', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  Sentry.addBreadcrumb({
    message: "Fetching all loans for a member",
    level: "info",
  });
  Sentry.setTag("feature", "members");

  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID format. ID must be a number.");
  }

  try {
    const member = await Member.findByPk(id, {
      include: [Book],
    });

    if (!member) {
      return res.status(404).send("Member not found");
    }

    res.json(member);
  } catch (error: any) {
    console.error(error);
    reportError(error, "members");
    res.status(500).send("Internal Server Error");
  }
});


Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});