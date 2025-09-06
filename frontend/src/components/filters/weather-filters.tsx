// Filters for weathers

import type React from "react";
import WeatherService from "../../features/dashboard/services/weather-service";
import { useState } from "react";

/**
 * Adding weather service here. JUST FOR TESTING PURPOSE.
 * REMOVE AFTER PROVING THE FUNCTIONALITY
 *
 * @returns
 */

const WeatherFilters: React.FC = () => {
  const [weatherSearchText, setWeatherSearchText] = useState<string>("");
  const { get_coordinates, get_weather_data } = WeatherService();


  // As default we will make fetch empoli :D
  const getCityData = async () => {
    const coordinates = await get_coordinates(weatherSearchText);
    if (coordinates && coordinates.data.length > 0) {
     const cityInfo = coordinates.data[0];
     const { name, lat , lon } = cityInfo;

     console.log(name, lat, lon);
    const meteoData = await get_weather_data(String(lat), String(lon));
    }else{
        console.log(`No city found`)
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setWeatherSearchText(e.currentTarget.value)}
        className="border rounded-md"
      />
      <button onClick={getCityData} className="border p-1 my-2">
        Cerca
      </button>
    </div>
  );
};

export default WeatherFilters;
