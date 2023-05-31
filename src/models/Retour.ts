import  mongoose, { Schema, models, model } from "mongoose";


interface Retour {
    nom : string ;
    email : string ;
    numero : string;
    cause : string;
    retour : string;
    adresse :string;
    date: Date;
    status : string;
}


const LesRetourSchema:Schema<Retour>= new Schema ({
    nom : String,
    email : String ,
    numero : String,
    cause : String,
    retour : String,
    adresse :String,
    date: {
        type: Date,
        default: Date.now,
      },
    status : String,

})

console.log('ALL THE MODELS from retour model : ',mongoose.modelNames());

delete models['lesRetours']

 const LesRetour = models.LesRetour || model("lesRetours", LesRetourSchema);

export default LesRetour;
  