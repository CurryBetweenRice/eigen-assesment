import mongoose, { model, Schema } from "mongoose";

const RentSchema = new Schema(
  {
    member_id: {
      type: String,
    },
    book_id: {
      type: String,
    },
    rent_due: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Borrowed", "Returned"],
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

const RentModel = model("Rent", RentSchema);

export default RentModel;
