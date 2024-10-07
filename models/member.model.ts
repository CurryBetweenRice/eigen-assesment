import mongoose, { model, Schema } from "mongoose";

const MemberSchema = new Schema(
  {
    member_id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    penalty_due: {
      type: Date,
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

const MemberModel = model("Member", MemberSchema);

export default MemberModel;
