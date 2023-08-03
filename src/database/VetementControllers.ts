import Vetement from "@/models/Vetement";
import { NextApiRequest, NextApiResponse } from "next";



export async function getVetements(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.slug) {
      // Fetch a single item based on the article slug
      const slug = req.query.slug as string;
      const vetement = await Vetement.findOne({ slug });

      if (!vetement) {
        res.status(404).json({ error: "Item Not Found" });
        return;
      }

      res.status(200).json(vetement); // Send the single item data in the response
      return;
    }

    // Fetch multiple items based on pagination or sorting
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;
    
    let vetements;

    if (req.query.sort && req.query.sort === 'highprice') {
      vetements = await Vetement.find({}).sort({ prix: -1 }).skip(skip).limit(limit);
    } else {
      vetements = await Vetement.find({}).sort({ date: -1 }).skip(skip).limit(limit);
    }

    if (!vetements) {
      res.status(404).json({ error: "Data Not Found" });
      return;
    }

    res.status(200).json(vetements); // Send the multiple items data in the response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while Fetching data" });
    res.end();
  }
}

  
  // Post : https://localhost/api/vetements
  
  export async function postVetement(req: NextApiRequest, res: NextApiResponse) {
    try {
      const formData = req.body;
      if (!formData) {
        return res.status(404).json({ error: 'Form Data not provided' });
      }
      const vetement = await Vetement.create(formData);
      res.status(201).json(vetement);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err });
    }
  }
  
  // Put : https://localhost/api/vetements/vetementId || titre
  
  export async function editVetement(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {vetementId} = req.query;
      const formData = req.body;
  
      if(vetementId && formData){
        const vetement = await Vetement.findByIdAndUpdate(vetementId,formData)
        res.status(200).json(vetement)
      }
      res.status(404).json({error : "vetement Not Selected"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while updating the vetement' });
    }
  }
  // Delete : https://localhost/api/vetements/vetementId || titre
  
  export async function deleteVetement(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {vetementId} = req.query;
  
      if(vetementId){
        const vetement = await Vetement.findByIdAndDelete(vetementId)
        return res.status(200).json(vetement)
      }
      res.status(404).json({error : "vetement Not Deleted"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while Deleting the vetement' });
    }
  }