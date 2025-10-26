import { param } from "express-validator";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    type: { type: String, enum: ["IN", "OUT"], required: true },
    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      required: true,
    },
    params: { type: Object, default: {} },
    query: { type: Object, default: {} },
    path: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    durationMs: { type: Number, default: null },
    date: { type: String, required: true },
    logLevel: { type: String, enum: ["INFO", "WARN", "ERROR"], default: null },
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", LogSchema);
