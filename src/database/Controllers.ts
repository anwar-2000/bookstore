/**Controllers */
import type { NextApiRequest, NextApiResponse } from 'next'
import Book from '@/models/Book'

// GET : https://localhost/api/books : sorted in reverse 'date'
export async function getBooks(req: NextApiRequest, res: NextApiResponse) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 15;
      const skip = (page - 1) * limit;
      const books = await Book.find({}).sort({ date: -1 }).skip(skip).limit(limit);
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

  // GET : https://localhost/api/query/bookId
export async function getBook(req: NextApiRequest, res: NextApiResponse) {
  try {
        const {bookId} = req.query
        if(bookId){
          const book = await Book.findOne({_id: bookId})
          console.log(bookId)
          res.status(200).json(book)
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

// GET : https://localhost/api/categories :
export async function getCategories(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await Book.distinct('categorie');
    if (!categories) {
     res.status(404).json({ error: "Categories Not Found" });
    }
     res.status(200).json({categories}); // send categories data in the response
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error while Fetching categories" });
    res.end()
  }
}

// GET : http://localhost:3000/api/categories/categorie
export async function getBooksOfCategory(req : NextApiRequest , res : NextApiResponse) {
    const {categorie} = req.query

    try {
       if (!categorie){res.status(404).json({error : "no parameter is passed"})}
       const books = await Book.find({categorie : categorie})
       res.status(200).json(books)
      } catch (error) {
        res.status(500).json({ error: error });
    }
}
