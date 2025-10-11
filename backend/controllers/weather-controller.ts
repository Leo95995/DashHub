import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

/**
 * Service that gets data from the weather service API
 * Gives back 2 functions when called:
 * - get_weather_data -> get city weather from lon -lat
 * - get_coordinates -> to get long lat
 */
const WEATHER_API = process.env.WEATHER_API;

/**
 *  Gets the data about the weather
 *
 *   const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
 *  */

const get_weather_data = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  try {
    const { lat, lon } = query;
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}`;
    const weatherData = await fetch(weatherUrl, { method: "GET" });
    if (weatherData.status === 200 && weatherData) {
      res.status(200).json(weatherData);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const get_coordinates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const query = req.query;
    if(!query.location){
        res.status(400).json("Bad Request . invalid location")
        return;
    }
    const {location} = query
      const locationUrl = ` https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&units=metric&appid=${
      WEATHER_API
    }`;
    try {
      const coordinates = await fetch(locationUrl, { method: "GET" });
      res.status(200).json(coordinates);
    }catch(e){
      res.status(500).json('Error')
    }

};

export const WeatherController = {
  get_weather_data,
  get_coordinates,
};
