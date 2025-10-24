import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff", "tenant"], default: "tenant" },
    phone: { type: String, required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }, // For tenant role users
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
