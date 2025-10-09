// Filters for weathers
import type React from "react";
import { useEffect, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity, setTemperatureType, setSearchText } from "../../store/weatherSlice";
// Components
import DashboardStorage from "../../services/storage/dashboard";


interface WeatherFilters {
  expanded: boolean;
}

const WeatherFilters: React.FC<WeatherFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state: any)=> state.weather);
  const temperatureType = useSelector((state: any) => state.weather.temperatureType);

  useEffect(() => {
    dispatch(fetchWeatherByCity(searchText) as any);
  }, []);

  return (
    <div
      className={`h-full transform transition-all duration-300 overflow-hidden 
    ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      <h2 className="text-md font-semibold mb-2 text-gray-700 dark:text-blue-300">
        Weather Filters
      </h2>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="location"
          className="text-md font-semibold text-gray-700 dark:text-gray-200 py-1"
        >
          City
        </label>
        <div className="flex">
          <input
            type="text"
            name="location"
            id="location"
            onChange={(e) => dispatch(setSearchText(e.currentTarget.value) as any )}
            placeholder="Search weather by city"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              dispatch(fetchWeatherByCity(searchText) as any)
            }
            className="
        border border-gray-300 dark:border-gray-600
        rounded-l-md
        w-50
        px-3 py-2
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
        transition-colors duration-200
      "
          />
          <button
            onClick={() =>
              dispatch(fetchWeatherByCity(searchText) as any)
            }
            className="
        border border-gray-300 dark:border-gray-600 border-l-0
        rounded-r-md
        px-4 py-2
        bg-blue-500 dark:bg-blue-600
        text-white
        font-semibold
        hover:bg-blue-600 dark:hover:bg-blue-700
        transition-colors duration-200
        cursor-pointer
      "
          >
            Cerca
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-48 py-4">
        <label
          htmlFor="temperature"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Select temperature
        </label>
        {temperatureType && (
          <select
            onChange={(e) =>
              dispatch(setTemperatureType(e.currentTarget.value.toLowerCase()))
            }
            value={temperatureType}
            name="temperature"
            id="temperature"
            className="
      border border-gray-300 dark:border-gray-600
      rounded-lg
      px-3 py-2
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
      transition-colors duration-200
      cursor-pointer
    "
          >
            <option value={"celsius"}>Celsius</option>
            <option value={"kelvin"}>Kelvin</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default WeatherFilters;
