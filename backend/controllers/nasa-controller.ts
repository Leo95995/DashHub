import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { start } from "repl";
import mongoose from "mongoose";
dotenv.config();

const NASA_API = process.env.NASA_API;
const nasa_baseurl = "https://api.nasa.gov";
/**
 *  Function used to get data for NASA PICTURE OF THE DAY
 */

const get_apod = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = mongoose.connection;
    const apod_collection = await db.collection("apod_list");
    const results = await apod_collection.find().toArray();

    const random_number = Math.floor(Math.random() * results.length);

    res.status(200).json(results[random_number]);
  } catch (error) {
    res.status(500).json("Error");
  }
};

const get_neo_data = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;

  const { start_date, end_date } = query;
  if (!start_date || !end_date) {
    res.status(400).json("Missing an important field");
    return;
  }
  const neo_url = `${nasa_baseurl}/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API}`;
  try {
    const neo_data = await fetch(neo_url, { method: "GET" });
    const result = await neo_data.json();
    const status = neo_data.status;
    if (status === 200) {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(("Error while fetching neo data" + error) as string);
  }
};

const get_cme_data = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  if (!query || !query.start_date || !query.end_date) {
    res.status(400).json(`Missing query params.BAD REQUEST!`);
    return;
  }
  try {
    const cme_url = `${nasa_baseurl}/DONKI/CME?startDate=${query.start_date}&endDate=${query.end_date}&api_key=${NASA_API}`;

    const cme_res = await fetch(cme_url, { method: "GET" });
    const cme_data = await cme_res.json();
    const cme_status = await cme_res.status;
    if (cme_status === 200) {
      res.status(200).json(cme_data);
    } else {
      res.status(500).json(`Error`);
    }
  } catch (error) {
    res.status(500).json("Server error while fetching cme data");
  }
};

export const NasaController = {
  get_apod,
  get_cme_data,
  get_neo_data,
};
