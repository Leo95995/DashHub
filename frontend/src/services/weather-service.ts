import type { IWeatherData, LocationCoordinates } from "./interfaces/interfaces";

/**
 * Service that gets data from the weather service API
 *
 * Gives back 2 functions when called:
 * - get_weather_data -> get city weather from lon -lat
 * - get_coordinates -> to get long lat
 */
const WeatherService = () => {
  // Get the weather datas
  const get_weather_data = async (lat: string, lon: string) => {
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_WEATHER_API
    }`;

    try {
      const res = await fetch(weatherUrl, {
        method: "GET",
      });
      const data : IWeatherData = await res.json();
      const status = res.status;

      return { data, status };
    } catch (error) {
      console.log("error");
    }
  };

  // Get the coordinates
  const get_coordinates = async (location: string) => {
    const locationUrl = ` https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API
    }`;
    try {
      const res = await fetch(locationUrl, { method: "GET" });
      const data : LocationCoordinates[] = await res.json();
      const status = res.status;
      return { data, status };
    } catch (error) {
      console.log("error");
    }
  };

  return { get_weather_data, get_coordinates };
};

export default WeatherService;
