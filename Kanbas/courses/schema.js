import mongoose from "mongoose";
const coursesSchema = new mongoose.Schema({
    _id: String,
    name: String,
    number: String,
    startDate: Date,
    endDate: Date,
    image: String,
  },
  { collection: "courses", versionKey: false });
export default coursesSchema;