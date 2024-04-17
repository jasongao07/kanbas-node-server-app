import mongoose from "mongoose";
import modulesSchema from "./schema.js";
const model = mongoose.model("CoursesModel", modulesSchema);
export default model;