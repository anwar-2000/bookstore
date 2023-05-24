import mongoose, { Schema, models, model } from "mongoose";
import Book from "./Book";

interface CommentInterface {
  bookId: mongoose.Schema.Types.ObjectId;
  username: string;
  comment: string;
  createdAt: Date;
  likes: number;
}

const CommentSchema: Schema<CommentInterface> = new Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Book,
    required: true,
  },
  username: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

CommentSchema.index({ bookId: 1 });


delete mongoose.models['Comments'];


//console.log('ALL THE MODELS FROM COMMENT MODAL : ',mongoose.modelNames());

const BooksComments = models.BooksComments || model("BooksComments", CommentSchema);

export default BooksComments;
