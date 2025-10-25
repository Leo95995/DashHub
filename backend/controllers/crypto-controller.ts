import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const db = mongoose.connection;

// Trending repos
const get_currency_list = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const collection = await db.collection("currencies_eur");
  try {
    const result = await collection.find().toArray();

    res.status(200).json(result);
  } catch (e) {
    res.status(404).json("Error");
  }
};

const getTopGainersAndLosers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  if (!query || !query.currency) {
    res.status(400).json("Missing param");
  }
  try {
    if (query.currency === "usd") {
      const collection = await db.collection("currencies_usd");
      const usd_data = await collection
        .find()
        .sort({ market_cap: -1 })
        .limit(10)
        .toArray();
      res.status(200).json(usd_data);
    } else if (query.currency === "eur") {
      const collection = await db.collection("currencies_eur");
      const eur_data = await collection
        .find()
        .sort({ market_cap: -1 })
        .limit(10)
        .toArray();

      res.status(200).json(eur_data);
      return;
    }
  } catch (error) {
    res.status(500).json(error as string);
  }
};

const get_trending_cryptos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  if (!query.coinIds || !query) {
    res.status(400).json("Missing query params. BAD REQUEST");
  }
  try {
    const crypto_list = (query.coinIds as string).split(",");
    const eurCollection = db.collection("currencies_eur");
    const usdCollection = db.collection("currencies_usd");

    const [eurData, usdData] = await Promise.all([
      eurCollection.find({ id: { $in: crypto_list } }).toArray(),
      usdCollection.find({ id: { $in: crypto_list } }).toArray(),
    ]);

    const result: Record<string, any> = {};

    for (const crypto of crypto_list) {
      const eurCrypto = eurData.find((data) => data.id === crypto);
      const usdCrypto = usdData.find((data) => data.id === crypto);

      if (eurCrypto && usdCrypto) {
        result[crypto] = {
          usd: usdCrypto.current_price,
          usd_24h_change: usdCrypto.price_change_percentage_24h,
          eur: eurCrypto.current_price,
          eur_24h_change: eurCrypto.price_change_percentage_24h,
        };
      }
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error as string);
  }
};

const get_complete_currencies_details = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const { currency } = query;

  let collection;
  if (!query || !currency) {
    res.status(400).json("Bad request. Missing query params needed.");
    return;
  }
  if (currency === "usd") {
    collection = await db.collection("currencies_usd");
  } else {
    collection = await db.collection("currencies_eur");
  }
  try {
    const result = await collection.find().toArray();

    res.status(200).json(result);
  } catch (e) {
    res.status(404).json("Error");
  }
};

export const CryptoController = {
  get_currency_list,
  get_complete_currencies_details,
  getTopGainersAndLosers,
  get_trending_cryptos,
};
