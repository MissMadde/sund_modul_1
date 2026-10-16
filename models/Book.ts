import mongoose, { Document, Schema } from "mongoose";
import { Author } from "./Author.js";

export interface Book extends Document {
  title: string;
  genre: "fantasy" | "dystopian" | "children" | "classic";
  publishedYear: number;
  author: mongoose.Types.ObjectId | Author;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<Book>({
  title: { 
    type: String, 
    required: [true, "Title is required"] 
  },
  genre: { 
    type: String, 
    enum: {
      values: ["fantasy", "dystopian", "children", "classic"],
      message: "{VALUE} is not a supported genre"
    },
    required: [true, "Genre is required"]
  },
  publishedYear: { 
    type: Number, 
    min: [1800, "Published year must be at least 1800"],
    max: [new Date().getFullYear(), "Published year cannot be the future"],
    required: [true, "Published year is required"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "Author is required"]
  }
}, { timestamps: true });

const Book = mongoose.model<Book>("Book", bookSchema);

export default Book;