import { Schema, models, model } from "mongoose";

interface IBook {
  titre: string;
  auteur: string;
  description: string;
  prix: number;
  image: string;
  status: string;
  date: Date;
}

const bookSchema: Schema<IBook> = new Schema({
  titre: String,
  auteur: String,
  description: String,
  prix: Number,
  image: String,
  status: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Book = models.Book  || model("Book", bookSchema);

export default Book;
