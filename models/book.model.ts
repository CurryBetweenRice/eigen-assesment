import mongoose, { model, Schema } from "mongoose";

const BookSchema = new Schema(
  {
    book_id: {
      type: String,
      unique: true,
    },
    book_title: {
      type: String,
    },
    book_author: {
      type: String,
    },
    book_stocks: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const BookModel = model("Book", BookSchema);

export default BookModel;
