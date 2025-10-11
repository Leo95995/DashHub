import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Trending repos
const get_currency_list = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const db = mongoose.connection;
  const collection = await db.collection("currencies");
  try {
    const result = await collection.find().toArray();

    res.status(200).json(result);
  } catch (e) {
    res.status(404).json("Error");
  }
};

export const CryptoController = {
  get_currency_list,
};
