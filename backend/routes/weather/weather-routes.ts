import * as express from "express";
import { WeatherController } from "../../controllers/weather-controller";

const weather_router = express.Router();

weather_router.get("/coordinates", WeatherController.get_coordinates );
weather_router.get("/weather", WeatherController.get_weather_data );



export default weather_router;
