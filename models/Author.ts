import mongoose, { Document, Schema } from "mongoose";

export interface Author extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const authorSchema = new Schema<Author>({
  name: { 
    type: String, 
    required: [true, "Author name is required"] 
  }
}, { timestamps: true });

const Author = mongoose.model<Author>("Author", authorSchema);

export default Author;