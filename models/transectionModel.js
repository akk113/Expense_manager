import mongoose from "mongoose";
const transectionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: [true]
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
    catagory: {
      type: String,
      required: [true, "catagory is required"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
  },
  { timestamps: true }
);

export const transectionModel = mongoose.model(
  "transection",
  transectionSchema
);
