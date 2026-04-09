import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Supplier", supplierSchema);