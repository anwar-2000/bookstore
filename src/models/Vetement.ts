import { Schema, models, model } from "mongoose";

interface vetementPattern {
    nom: string;
    description: string;
    price: number;
    poids : number;
    imageUrl1 : string;
    imageUrl2 : string;
    imageUrl3 : string;
    color: string;
    size: string;
    vendu : boolean;
    slug : string,
}

const vetementSchema : Schema<vetementPattern> = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl1 : String,
    imageUrl2 : String,
    imageUrl3 : String,
    poids: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    vendu : {type : Boolean , default : false},
    slug : String
});


const Vetement = models.Vetement || model('Vetement',vetementSchema)
export default Vetement