import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const NASA_API = process.env.NASA_API;

/**
 *  Function used to get data for NASA PICTURE OF THE DAY
 */

//    const nasa_url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`;

const get_apod = async (req: Request, res: Response, next: NextFunction) => {
const apod_data = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`;
  console.log('LOGGED');

  res.status(200).json("OK");
};



const get_mars_rover_data = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const rover_url = fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${NASA_API}`);

  res.status(200).json("OK ROVER");
};

const get_neo_data = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json("Ok NeoWsData");
};

export const NasaController = {
  get_apod,
  get_mars_rover_data,
  get_neo_data,
};
