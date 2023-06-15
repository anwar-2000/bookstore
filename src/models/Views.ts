import mongoose, { Schema, models, model } from "mongoose";
import Book from "./Book";

interface ViewsInterface {
    slug : string;
    views : number;
}

const ViewSchema:Schema<ViewsInterface> = new Schema({
    slug: {
        type: String,
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