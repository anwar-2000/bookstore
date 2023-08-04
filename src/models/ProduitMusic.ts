import { Schema, models, model } from "mongoose";

interface MusicProductPattern {
    nom: string;
    description: string;
    price: number;
    poids : number;
    imageUrl1 : string;
    imageUrl2 : string;
    imageUrl3 : string;
    vendu : boolean;
    slug : string;
}

const  MusicProductSchema : Schema<MusicProductPattern> = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl1 : String,
    imageUrl2 : String,
    imageUrl3 : String,
    poids: { type: Number, required: true },
    vendu : {type : Boolean , default : false},
    slug : String
});

delete models['MusicProduit']


const MusicProduct = models.MusicProduct || model('MusicProduit',MusicProductSchema);

export default MusicProduct