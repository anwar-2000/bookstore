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
  vendu : boolean;
  rating: number;
  slug : string;
  poids : number;
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
  vendu :{
    type : Boolean,
    default : false,
  },
  quantite: Number,
  etat: String,
  rating: Number,
  slug : String,
  poids : Number,
  pages: Number,
  date_du_livre: String,
  categorie: String,
});


// Overwrite the existing Book model with the new schema

const Livre = models.Livre || model("Livre", bookSchema);

// Check if the "poids" field already exists in the schema
if (!Livre.schema.path("poids")) {
  Livre.schema.add({
    poids: Number,
  });
}
export default Livre
