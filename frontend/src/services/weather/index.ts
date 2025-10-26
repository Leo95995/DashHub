import type { IWeatherData, LocationCoordinates } from "../../types/services/weather";
import { services_url } from "../../utils/environment";

const WeatherService = () => {
  const get_weather_data = async (lat: string, lon: string) => {
    const weatherUrl = `${services_url.weather}/weather?lat=${lat}&lon=${lon}`;
    try {
      const res = await fetch(weatherUrl, {
        method: "GET",
      });
      const data: IWeatherData = await res.json();
      const status = res.status;

      return { data, status };
    } catch (error) {
      return { error: error as string, success: false };
    }
  };

  // Get the coordinates
  const get_coordinates = async (location: string) => {
    if (!location) {
      return { error: "Missing location" };
    }
    const locationUrl = `${services_url.weather}/coordinates?location=${location}`;
    try {
      const res = await fetch(locationUrl, { method: "GET" });
      const data: LocationCoordinates[] = await res.json();
      const status = res.status;
      return { data, status };
    } catch (error) {
      return { error: error as string };
    }
  };

  return { get_weather_data, get_coordinates };
};

export default WeatherService;
