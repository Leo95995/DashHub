import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { start } from "repl";
dotenv.config();

const NASA_API = process.env.NASA_API;
const nasa_baseurl = "https://api.nasa.gov";
/**
 *  Function used to get data for NASA PICTURE OF THE DAY
 */
const get_apod = async (req: Request, res: Response, next: NextFunction) => {
  const apod_url = `${nasa_baseurl}/planetary/apod?api_key=${NASA_API}`;
  try {
    const apod_data = await fetch(apod_url, { method: "GET" });
    if (apod_data.status === 200) {
      const data = await apod_data.json();

      res.status(200).json(data);
    }
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
    return
  }
  const neo_url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API}`;
  try {
    const neo_data = await fetch(neo_url, { method: "GET" });
    const result =await neo_data.json();
    const status = neo_data.status;
    if (status === 200) {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error while fetching neo data" + error as string);
  }
};

const get_mars_rover_data = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rover_url = fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${NASA_API}`
  );

  res.status(200).json("OK ROVER");
};

export const NasaController = {
  get_apod,
  get_mars_rover_data,
  get_neo_data,
};
