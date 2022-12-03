import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  Id: { type: String, required: true },
  Name: { type: String, required: true },
  Age: { type: String, required: true },
  Mark1: { type: String, required: true },
  Mark2: { type: String, required: true },
  Mark3: { type: String, required: true },
});

export default mongoose.model("Student", studentSchema);