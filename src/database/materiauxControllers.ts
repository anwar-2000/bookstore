import Material from "@/models/Matriaux";
import { NextApiRequest, NextApiResponse } from "next";



export async function getMateriaux(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.slug) {
      // Fetch a single item based on the article slug
      const slug = req.query.slug as string;
      const material = await Material.findOne({ slug });

      if (!material) {
        res.status(404).json({ error: "Item Not Found" });
        return;
      }

      res.status(200).json(material); // Send the single item data in the response
      return;
    }

    // Fetch multiple items based on pagination or sorting
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;
    let materials;

    if (req.query.sort && req.query.sort === 'highprice') {
      materials = await Material.find({}).sort({ prix: -1 }).skip(skip).limit(limit);
    } else {
      materials = await Material.find({}).sort({ date: -1 }).skip(skip).limit(limit);
    }

    if (!materials) {
      res.status(404).json({ error: "Data Not Found" });
      return;
    }

    res.status(200).json(materials); // Send the multiple items data in the response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while Fetching data" });
    res.end();
  }
}

  
  // Post : https://localhost/api/materials
  
  export async function postMateriaux(req: NextApiRequest, res: NextApiResponse) {
    try {
      const formData = req.body;
      console.log(formData);
      if (!formData) {
        return res.status(404).json({ error: 'Form Data not provided' });
      }
      const material = await Material.create(formData);
      res.status(201).json(material);
    } catch (err) {
      return res.status(500).json({ error: 'Error while creating material' });
    }
  }
  
  // Put : https://localhost/api/materials/materialId || titre
  
  export async function editMateriaux(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {materialId} = req.query;
      const formData = req.body;
  
      if(materialId && formData){
        const material = await Material.findByIdAndUpdate(materialId,formData)
        res.status(200).json(material)
      }
      res.status(404).json({error : "material Not Selected"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while updating the material' });
    }
  }
  // Delete : https://localhost/api/materials/materialId || titre
  
  export async function deleteMateriaux(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {materialId} = req.query;
  
      if(materialId){
        const material = await Material.findByIdAndDelete(materialId)
        return res.status(200).json(material)
      }
      res.status(404).json({error : "material Not Deleted"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while Deleting the material' });
    }
  }