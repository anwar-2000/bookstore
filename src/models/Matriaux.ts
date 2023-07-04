import { Schema, models, model } from "mongoose";

interface MaterialPattern {
    nom: string;
    description: string;
    price: number;
    poids : number;
    imageUrl1 : string;
    imageUrl2 : string;
    imageUrl3 : string;
    color: string;
    vendu : boolean;
    slug : string;
}

const  MaterialSchema : Schema<MaterialPattern> = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl1 : String,
    imageUrl2 : String,
    imageUrl3 : String,
    poids: { type: Number, required: true },
    color: { type: String, required: true },
    vendu : {type : Boolean , default : false},
    slug : String
});


const Material = models.Material || model('Material',MaterialSchema)
export default Material