import mongoose from "mongoose";

mongoose.set('bufferTimeoutMS', 120000);

const blogStatusSchema = new mongoose.Schema(
    {
    devId: { type: Number, required: true, unique: true },
    status: { type: String, enum: ["approved", "rejected"], required: true },
    customAuthor: { type: String, default: "" },
    customDate: { type: String, default: "" } 
  },
  { timestamps: true }
);

export default mongoose.model("BlogStatus", blogStatusSchema);
