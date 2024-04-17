import mongoose from "mongoose";
const modulesSchema = new mongoose.Schema({
    _id: String,
    name: String,
    number: String,
    startDate: Date,
    endDate: Date,
    image: String,
  },
  { collection: "modules", versionKey: false });
export default modulesSchema;