import Material from "@/models/Matriaux";
import { NextApiRequest, NextApiResponse } from "next";



export async function getMateriaux(req: NextApiRequest, res: NextApiResponse) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 15;
      const skip = (page - 1) * limit;
      let books;
  
      if (req.query.sort && req.query.sort === 'highprice') {
        books = await Material.find({}).sort({ prix: -1 }).skip(skip).limit(limit);
      } else {
        books = await Material.find({}).sort({ date: -1 }).skip(skip).limit(limit);
      }
  
      if (!books) {
        res.status(404).json({ error: "Data Not Found" });
      }
  
      res.status(200).json(books); // send books data in the response
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error while Fetching data" });
      res.end();
    }
  }
  
    
  // GET : https://localhost/api/query/bookId
  export async function getMaterial(req: NextApiRequest, res: NextApiResponse) {
    try {
          const {slug} = req.query;
          //console.log('CONTROLLER',slug)
          if(slug){
            const book = await Material.findOne({slug: slug})
            //console.log(bookId)
            res.status(200).json(book)
            return ;
          }
          res.status(404).json({error : "Book Not Found"})
    } catch (err) {
        res.status(404).json({error : "Can Not Get The Book "})
    }
  }
  
  // Post : https://localhost/api/books
  
  export async function postMateriaux(req: NextApiRequest, res: NextApiResponse) {
    try {
      const formData = req.body;
      if (!formData) {
        return res.status(404).json({ error: 'Form Data not provided' });
      }
      const book = await Material.create(formData);
      res.status(201).json(book);
    } catch (err) {
      return res.status(500).json({ error: 'Error while creating book' });
    }
  }
  
  // Put : https://localhost/api/books/bookId || titre
  
  export async function editMateriaux(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {bookId} = req.query;
      const formData = req.body;
  
      if(bookId && formData){
        const book = await Material.findByIdAndUpdate(bookId,formData)
        res.status(200).json(book)
      }
      res.status(404).json({error : "Book Not Selected"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while updating the book' });
    }
  }
  // Delete : https://localhost/api/books/bookId || titre
  
  export async function deleteMateriaux(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {bookId} = req.query;
  
      if(bookId){
        const book = await Material.findByIdAndDelete(bookId)
        return res.status(200).json(book)
      }
      res.status(404).json({error : "Book Not Deleted"})
    } catch (err) {
      return res.status(500).json({ error: 'Error while Deleting the book' });
    }
  }