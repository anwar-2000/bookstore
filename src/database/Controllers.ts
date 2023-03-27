/**Controllers */
import type { NextApiRequest, NextApiResponse } from 'next'
import Book from '@/models/Book'

// GET : https://localhost/api/books
export async function getBooks(req: NextApiRequest, res: NextApiResponse) {
    try {
      const books = await Book.find({});
      if (!books) {
       res.status(404).json({ error: "Data Not Found" });
      }
       res.status(200).json(books); // send books data in the response
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: "Error while Fetching data" });
      res.end()
    }
  }

// Post : https://localhost/api/books

export async function postBook(req: NextApiRequest, res: NextApiResponse){
    try {
            const formData = req.body;
            if(!formData)  { return res.status(404).json({error :'Form Data not provided'})}
            Book.create(formData, (err: any, book: any) => {
                if (err) {
                  return res.status(500).json({ error: 'Error while creating book' });
                }
                res.status(201).json(book);
              });
            } catch (err) {
              return res.status(500).json({ error: 'Error while creating book' });
              res.end()
            }
          }