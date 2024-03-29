/**Controllers */
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '@/models/User';
import Livre from '@/models/Livres';
import LesDonsBoutique from '@/models/LesDons';
import BooksComments from '@/models/BooksComments'; 
import ViewsModal from '@/models/Views';
import LesRetour from '@/models/Retour';
import Vetement from '@/models/Vetement';
import Material from '@/models/Matriaux';

//const BooksComments = mongoose.model('BooksComments')



export async function getBooks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;
    let books;

    if (req.query.sort && req.query.sort === 'highprice') {
      books = await Livre.find({}).sort({ prix: -1 }).skip(skip).limit(limit);
    } else {
      books = await Livre.find({}).sort({ date: -1 }).skip(skip).limit(limit);
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
export async function getBook(req: NextApiRequest, res: NextApiResponse) {
  try {
        const {slug} = req.query;
        //console.log('CONTROLLER',slug)
        if(slug){
          const book = await Livre.findOne({slug: slug})
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

export async function postBook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: 'Form Data not provided' });
    }
    const book = await Livre.create(formData);
    res.status(200).json(book);
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
      const book = await Livre.findByIdAndUpdate(bookId,formData)
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
      const book = await Livre.findByIdAndDelete(bookId)
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
    const categories = await Livre.distinct('categorie');
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
       const books = await Livre.find({categorie : categorie})
       res.status(200).json(books)
      } catch (error) {
        res.status(500).json({ error: error });
    }
}
// get : htttp:localhost/api/search?searchParam=?searchValue=
export async function getSearchBooks(req: NextApiRequest, res: NextApiResponse) {
  //getting only the id , title , auteur
  try {
    const searchParam = req.query.searchParam as string;
    const searchValue = req.query.searchValue;
    let searchBooks;
    //console.error(searchParam , searchValue)
    if (searchParam && searchValue) {

      if(searchParam === 'vetements'){
        searchBooks = await Vetement.find(
          { nom : { $regex: searchValue, $options: "i" } }, //case_in-sensative
          { nom: 1, imageUrl1 : 1 , slug : 1 }
        );
      }else if(searchParam === "materiaux"){
        searchBooks = await Material.find(
          { nom : { $regex: searchValue, $options: "i" } }, //case_in-sensative
          { nom: 1, imageUrl1 : 1 , slug :1 }
        );
      } else{
        searchBooks = await Livre.find(
          { [searchParam]: { $regex: searchValue, $options: "i" } }, //case_in-sensative
          { _id: 1, titre: 1,  slug:1, imageUrl1 : 1  }
        );
      }
      //console.log("both params provided : " , searchBooks)
    } 
    if (!searchBooks) {
      res.status(404).json({ Error: "could not fetch from Search inputs" });
    }
    res.status(200).json(searchBooks);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}



/**  *************************************************** USERS   **************************************************************************/
export async function addUser(req: NextApiRequest, res: NextApiResponse){
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: 'Register Form Data not provided' });
    }
    const {email} = formData ;
    const existingUser = await User.findOne({email});
    if(existingUser) {return res.status(422).json({message : "User Already in DB"})}
    const user = await User.create(formData);
    //console.log(user);
    res.status(200).json({user});
  } catch (err) {
    console.log(err); return res.status(500).json({error :"error"});
  }
}

export  async function  checkUserAdmin(req : NextApiRequest , res : NextApiResponse){
    try {
      const email = req.body
      if(!email){
        return res.status(404).json({error : 'Error Sending Email to DB'});
      }
      const user = await User.findOne({email});
      if(!user){return res.status(404).json({error : 'User not found'});}
      const isAdmin = user.isAdmin;
      res.status(200).json({isAdmin})
    }catch(err){
      return res.status(500).json({err});
    }

}

export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;
    const skip = (page - 1) * limit;
    const users = await User.find({}).sort({ date: -1 }).skip(skip).limit(limit);
    if (!users) {
     res.status(404).json({ error: "Data Not Found" });
    }
     res.status(200).json(users); // send books data in the response
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error while Fetching data" });
    res.end()
  }
}

export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userEmail } = req.query;

    if (userEmail) {
      const user = await User.findOneAndDelete({ email: userEmail });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    }

    return res.status(400).json({ error: 'Missing email parameter' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error while deleting the user' });
  }
}

/** *************************************  LES DONS ********************************************* */


export async function addDon(req: NextApiRequest, res: NextApiResponse){
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: 'Form Data not provided' });
    }
    const Don = await LesDonsBoutique.create(formData);
    //console.log('Don : ',Don);
    res.status(200).json({Don});
  } catch (err) {
    //console.log(err);
     return res.status(500).json({error :"error"});
  }
}


export async function getDons (req: NextApiRequest, res: NextApiResponse) {
    try {
      const dons = await LesDonsBoutique.find({}).sort({ date: -1 })
      if (!dons) {
        res.status(404).json({ error: "Funds Not Found" });
       }
        res.status(200).json(dons); // send funds data in the response
    }catch(err){
      return res.status(500).json({error :"error"});
    }
}

export async function deleteDon(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {donId} = req.query;

    if(donId){
      const don = await LesDonsBoutique.findByIdAndDelete(donId)
      return res.status(200).json(don)
    }
    res.status(404).json({error : "don Not Deleted"})
  } catch (err) {
    return res.status(500).json({ error: 'Error while Deleting the don' });
  }
}


/********************************************************** COMMENTS  ****************************************** */
export async function getBookComments(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const {slug} = req.query;
    if(slug){
      const commentaires = await BooksComments.find({ slug: slug }).sort({ createdAt: -1 }).skip(skip).limit(limit);;
      res.status(200).json(commentaires) // send comments data in the response
    }else {
      res.status(404).json('could not find book id');   
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error while Fetching comments" });
    res.end()
  }
}
export async function incrementLikes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { commentId , state } = req.query;
    if (commentId) {
        if(state=="add"){const updatedComment = await BooksComments.findByIdAndUpdate(
          commentId,
          { $inc: { likes: 1 } },
          { new: true }
        );
        if (updatedComment) {
          res.status(200).json(updatedComment);
        } else {
          res.status(404).json("Could not find comment");
        }
      }else if(state=="del"){
        {const updatedComment = await BooksComments.findByIdAndUpdate(
          commentId,
          { $inc: { likes: -1 } },
          { new: true }
        );
        if (updatedComment) {
          res.status(200).json(updatedComment);
        } else {
          res.status(404).json("Could not find comment");
        }
      }
      }}
       else {
      res.status(400).json("Missing commentId in the request body");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while incrementing likes" });
  }
}
export async function addComment(req: NextApiRequest, res: NextApiResponse){
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: 'Form Data not provided' });
    }
    const commentaires = await BooksComments.create(formData);
    //console.log('Don : ',Don);
    res.status(200).json({commentaires});
  } catch (err) {
    //console.log(err);
     return res.status(500).json({error :"error"});
  }
}

export async function deleteBookComments(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {commentId} = req.query;
    if(commentId){
      const comments = await BooksComments.findOneAndDelete({ _id: commentId });
      res.status(200).json(comments) // send comments data in the response
    }else {
      res.status(404).json('could not find book id');   
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error while deleting comment" });
    res.end()
  }
}


/********************************************************** VIEWS  ****************************************** */
export async function getBookViews(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;
    if (slug) {
      const views = await ViewsModal.findOne({ slug }); // Find a single document instead of an array
      if (views) {
        res.status(200).json(views.views); // Send the number of views in the response
      } else {
        res.status(200).json('0');
      }
    } else {
      res.status(404).json('Could not find book id');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while fetching views" });
  }
}

export async function addViewToBook(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.body;
    if (slug) {
      // Check if the bookId exists in the ViewsModal collection
      const existingView = await ViewsModal.findOne({ slug });

      if (existingView) {
        // BookId exists, increment the views count by 1
        existingView.views += 1;
        await existingView.save();
        res.status(200).json(existingView);
      } else {
        // BookId doesn't exist, create a new document with views count set to 1
        const newView = await ViewsModal.create({ slug, views: 1 });
        res.status(200).json(newView);
      }
    } else {
      res.status(404).json('Could not find bookId');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while adding views" });
  }
}


/********************************************************* */


export async function addRetour(req: NextApiRequest, res: NextApiResponse){
  try {
    const formData = req.body;
    if (!formData) {
      return res.status(404).json({ error: 'Form Data not provided' });
    }
    const Retour = await LesRetour.create(formData);
    //console.log('Don : ',Don);
    res.status(200).json({Retour});
  } catch (err) {
    //console.log(err);
     return res.status(500).json({error :"error"});
  }
}


export async function getAllRetour (req: NextApiRequest, res: NextApiResponse) {
    try {
      const retours = await LesRetour.find({}).sort({ date: -1 })
      if (!retours) {
        res.status(404).json({ error: "retours Not Found" });
       }
        res.status(200).json(retours); // send funds data in the response
    }catch(err){
      return res.status(500).json({error :"error"});
    }
}

export async function deleteRetour (req: NextApiRequest, res: NextApiResponse) {
  try {
    const {retourId} = req.query;
    console.log(retourId)
    if(retourId){
      const retour = await LesRetour.findOneAndDelete({ _id: retourId });
      res.status(200).json(retour) // send comments data in the response
    }else {
      res.status(404).json('could not find retour id');   
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error while deleting retour" });
    res.end()
  }
}