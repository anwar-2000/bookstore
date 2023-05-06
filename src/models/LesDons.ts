import { Schema, models, model } from "mongoose";


interface Don {
    nom : string ;
    prenom : string ;
    numero : string;
    email : string;
    dons : string;
    adresse :string;
    date: Date;
    status : string;
}


const LesDonsSchema:Schema<Don>= new Schema ({
    nom : String,
    prenom : String,
    numero : String,
    adresse : String,
    dons : String,
    email : String,
    date: {
        type: Date,
        default: Date.now,
      },
    status : String,

})

const LesDons = models.Livre || model("Dons", LesDonsSchema);
export default LesDons