import mongoose, { Schema, models, model } from "mongoose";
import Book from "./Book";

interface ViewsInterface {
    bookId : mongoose.Schema.Types.ObjectId;
    views : number;
}

const ViewSchema:Schema<ViewsInterface> = new Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Book, 
        required: true,
      },
      views: {
        type: Number,
        default: 0,
      },
});

ViewSchema.index({ bookId: 1 });

delete mongoose.models['views'];

const ViewsModal = models.ViewsModal || model('views',ViewSchema)

export default ViewsModal