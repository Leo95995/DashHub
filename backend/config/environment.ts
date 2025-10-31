import dotenv from "dotenv";
dotenv.config();

/**
 * Env Variables
 */
export const environment = {
  WEATHER_API: process.env.WEATHER_API,
  NASA_API: process.env.NASA_API,
  GITHUB_API: process.env.GITHUB_API,
  MONGO_URI: process.env.MONGO_URI,
  FE_ORIGIN: process.env.PROD_ORIGIN,
};
