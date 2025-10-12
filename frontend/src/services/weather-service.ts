import type {
  IWeatherData,
  LocationCoordinates,
} from "./interfaces/interfaces";

/**
 * Gives back 2 functions when called:
 * - get_weather_data -> get city weather from lon -lat
 * - get_coordinates -> to get long lat
 */

const base_weather_url = `${import.meta.env.VITE_BACKEND_URI}/weather`;
const WeatherService = () => {
  const get_weather_data = async (lat: string, lon: string) => {
    const weatherUrl = `${base_weather_url}/weather?lat=${lat}&lon=${lon}`;
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
    const locationUrl = `${base_weather_url}/coordinates?location=${location}`;
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
