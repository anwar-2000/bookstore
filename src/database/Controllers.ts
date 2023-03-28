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

  // GET : https://localhost/api/bookId
export async function getBook(req: NextApiRequest, res: NextApiResponse) {
  try {
        const {bookId} = req.query
        if(bookId){
          const book = await Book.findOne({_id: bookId})
          console.log(bookId)
          res.status(200).json(book)
          console.log(book)
        }
        res.status(404).json({error : "Book Not Found"})
  } catch (err) {
      res.status(404).json({error : "Can Not Get The Book "})
  }
}

// Post : https://localhost/api/books

export async function postBook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: 'Form Data not provided' });
    }
    const book = await Book.create(formData);
    res.status(201).json(book);
  } catch (err) {
    return res.status(500).json({ error: 'Error while creating book' });
  }
}

// Put : https://localhost/api/books/bookId || titre

export async function editBook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {bookId} = req.query;
    const formData = req.body;

    if(bookId && formData){
      const book = await Book.findByIdAndUpdate(bookId,formData)
      res.status(200).json(book)
    }
    res.status(404).json({error : "Book Not Selected"})
  } catch (err) {
    return res.status(500).json({ error: 'Error while updating the book' });
  }
}
// Delete : https://localhost/api/books/bookId || titre

export async function deleteBook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {bookId} = req.query;

    if(bookId){
      const book = await Book.findByIdAndDelete(bookId)
      return res.status(200).json(book)
    }
    res.status(404).json({error : "Book Not Deleted"})
  } catch (err) {
    return res.status(500).json({ error: 'Error while Deleting the book' });
  }
}