import Actualite from "@/models/Actualite";
import { NextApiRequest, NextApiResponse } from "next";



export async function getActualite(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch multiple items based on pagination or sorting
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;

    let Actualites;

    if (req.query.sort && req.query.sort === 'desc') {
      Actualites = await Actualite.find({}).sort({ date: -1 }).skip(skip).limit(limit);
    } else {
      Actualites = await Actualite.find({}).sort({ date: 1 }).skip(skip).limit(limit);
    }

    if (!Actualites) {
      res.status(404).json({ error: "Data Not Found" });
      return;
    }

    res.status(200).json(Actualites); // Send the multiple items data in the response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while Fetching data" });
    res.end();
  }
}

  
  // Post : https://localhost/api/Actualites
  
  export async function postActualite(req: NextApiRequest, res: NextApiResponse) {
    try {
      const formData = req.body;
      console.log(formData);
      if (!formData) {
        return res.status(404).json({ error: 'Form Data not provided' });
      }
      const actualite = await Actualite.create(formData);
      res.status(200).json(actualite);
    } catch (err) {
      return res.status(500).json({ error: 'Error while creating Actualite' });
    }
  }
  
  // Put : https://localhost/api/Actualites/ActualiteId || titre
  
  export async function editActualite(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {ActualiteId} = req.query;
      const formData = req.body;
  
      if(ActualiteId && formData){
        const actualite = await Actualite.findByIdAndUpdate(ActualiteId,formData)
        res.status(200).json(actualite)
      }
      res.status(404).json({error : "Actualite Not Selected"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while updating the Actualite' });
    }
  }
  // Delete : https://localhost/api/Actualites/ActualiteId || titre
  
  export async function deleteActualite(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {ActualiteId} = req.query;
  
      if(ActualiteId){
        const actualite = await Actualite.findByIdAndDelete(ActualiteId)
        return res.status(200).json(actualite)
      }
      res.status(404).json({error : "Actualite Not Deleted"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while Deleting the Actualite' });
    }
  }