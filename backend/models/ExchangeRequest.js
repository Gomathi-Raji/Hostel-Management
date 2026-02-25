import mongoose from "mongoose";

const exchangeRequestSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    currentRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    desiredRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    reason: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    additionalNotes: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvalDate: { type: Date },
    rejectionReason: { type: String },
    exchangeDate: { type: Date },
  },
  { timestamps: true }
);

exchangeRequestSchema.index({ tenant: 1, status: 1 });
exchangeRequestSchema.index({ status: 1 });
exchangeRequestSchema.index({ createdAt: -1 });

const ExchangeRequest = mongoose.model("ExchangeRequest", exchangeRequestSchema);
export default ExchangeRequest;