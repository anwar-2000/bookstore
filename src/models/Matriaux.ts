import { Schema, models, model } from "mongoose";

interface MaterialPattern {
    nom: string;
    description: string;
    price: number;
    poids : number
    color: string;
    vendu : boolean;
    slug : string;
}

const  MaterialSchema : Schema<MaterialPattern> = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    poids: { type: Number, required: true },
    color: { type: String, required: true },
    vendu : {type : Boolean , default : false},
    slug : String
});


const Material = models.Material || model('Material',MaterialSchema)
export default Material