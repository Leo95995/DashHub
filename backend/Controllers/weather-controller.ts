import { NextFunction, Request, Response } from "express";
import { baseUrls } from "../config/baseUrls";
import { environment } from "../config/environment";

const { WEATHER_API } = environment;

const get_weather_data = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  try {
    const { lat, lon } = query;
    if (!lat || !lon) {
      res.status(400).json("Missing fundamentals query params");
    }

    const weatherUrl = `${baseUrls.weather}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}`;
    const weatherData = await fetch(weatherUrl, { method: "GET" });
    if (weatherData.status === 200) {
      const data = await weatherData.json();
      res.status(200).json(data);
    } else {
      res.status(weatherData.status).json(`Error`);
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
  if (!query.location) {
    res.status(400).json("Bad Request . invalid location");
    return;
  }
  const { location } = query;
  const locationUrl = ` ${baseUrls.weather}/geo/1.0/direct?q=${location}&limit=1&units=metric&appid=${WEATHER_API}`;
  try {
    const coordinates = await fetch(locationUrl, { method: "GET" });

    const coordinates_status = coordinates.status;
    const coordinates_data = await coordinates.json();
    if (coordinates_status === 200) {
      res.status(200).json(coordinates_data);
    } else {
      res.status(coordinates_status).json(`Error`);
    }
  } catch (e) {
    res.status(500).json("Error");
  }
};

export const WeatherController = {
  get_weather_data,
  get_coordinates,
};
