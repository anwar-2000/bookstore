import MusicProduct from "@/models/ProduitMusic";
import { NextApiRequest, NextApiResponse } from "next";

export async function getMusic(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.slug) {
      // Fetch a single item based on the article slug
      const slug = req.query.slug as string;
      const music = await MusicProduct.findOne({ slug });

      if (!music) {
        res.status(404).json({ error: "Item Not Found" });
        return;
      }

      res.status(200).json(music); // Send the single item data in the response
      return;
    }

    // Fetch multiple items based on pagination or sorting
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    let musics;    
    if (req.query.sort && req.query.sort === 'highprice') {
      musics = await MusicProduct.find({}).sort({ prix: -1 }).skip(skip).limit(limit);
    } else {
      musics = await MusicProduct.find({}).sort({ date: -1 }).skip(skip).limit(limit);
    }
    if (!musics) {
      res.status(404).json({ error: "Data Not Found" });
      return;
    }
    res.status(200).json(musics); // Send the multiple items data in the response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while Fetching data" + err });
    res.end();
  }
}  
  // Post : https://localhost/api/music
  
  export async function postMusic(req: NextApiRequest, res: NextApiResponse) {
    try {
      const formData = req.body;
      console.log(formData);
      if (!formData) {
        return res.status(404).json({ error: 'Form Data not provided' });
      }
      const music = await MusicProduct.create(formData);
      res.status(201).json(music);
    } catch (err) {
      return res.status(500).json({ error: 'Error while creating music' + err });
    }
  }
  
  // Put : https://localhost/api/music?musicId || titre
  
  export async function editMusic(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {musicId} = req.query;
      const formData = req.body;
  
      if(musicId && formData){
        const music = await MusicProduct.findByIdAndUpdate(musicId,formData)
        res.status(200).json(music)
      }
      res.status(404).json({error : "music Not Selected"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while updating the music' });
    }
  }
  // Delete : https://localhost/api/music?musicId || titre
  
  export async function deleteMusic(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {musicId} = req.query;
  
      if(musicId){
        const music = await MusicProduct.findByIdAndDelete(musicId)
        return res.status(200).json(music)
      }
      res.status(404).json({error : "music Not Deleted"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while Deleting the music' + err });
    }
  }