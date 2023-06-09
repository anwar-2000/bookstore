import { Schema, models, model } from "mongoose";

interface IBook {
  titre: string;
  auteur: string;
  description: string;
  prix: number;
  imageUrl1 : string;
  imageUrl2 : string;
  imageUrl3 : string;
  status: string;
  quantite: number;
  etat: string;
  date: Date;
  rating: number;
  pages: string;
  date_du_livre: string;
  categorie: string;
}

const bookSchema: Schema<IBook> = new Schema({
  titre: String,
  auteur: String,
  description: String,
  prix: Number,
  imageUrl1 : String,
  imageUrl2 : String,
  imageUrl3 : String,
  status: String,
  date: {
    type: Date,
    default: Date.now,
  },
  quantite: Number,
  etat: String,
  rating: Number,
  pages: Number,
  date_du_livre: String,
  categorie: String,
});


// Overwrite the existing Book model with the new schema

const Book = models.Book || model("Book", bookSchema);
export default Book



