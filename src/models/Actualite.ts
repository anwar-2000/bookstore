import { Schema, models, model } from "mongoose";

interface ActualitePattern {
    nom: string;
    description: string;
    imageUrl1 : string;
    date_event : string;
    date : Date;
    slug : string;
}

const  ActualiteSchema : Schema<ActualitePattern> = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    date_event : Date,
    imageUrl1 : String,
    date : {type : Date , default : Date.now()},
    slug : String
});


const Actualite = models.Actualite || model('Actualite',ActualiteSchema);
export default Actualite