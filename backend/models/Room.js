import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    type: { type: String, enum: ["single", "double", "shared"], default: "single" },
    rent: { type: Number, required: true },
    occupancy: { type: Number, default: 0 },
    capacity: { type: Number, default: 1 },
    status: { type: String, enum: ["available", "occupied", "maintenance"], default: "available" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

roomSchema.index({ status: 1 });
roomSchema.index({ active: 1 });
roomSchema.index({ type: 1, status: 1 });

const Room = mongoose.model("Room", roomSchema);
export default Room;
