// Filters for weathers
import type React from "react";
import FilterSection from "./filters-section";
import type { IFilters } from "./types";
import { useWeatherFilterLogic } from "./hooks/useWeatherFilterLogic";
import ReactLoader from "../../../../components/Loaders/ReactLoaders";
import { Loader, Loader2 } from "lucide-react";
import WeatherSearchBar from "../Widgets/WeatherWidget/WeatherSearch/WeatherSearchBar";


const WeatherFilters: React.FC<IFilters> = ({ expanded }) => {

  //  Weather hook custom
  const {loading, searchText, changeTemperature, searchByCity,setCityName, temperatureType} = useWeatherFilterLogic()


  console.log(searchText);

  const renderTemperatureSelector = () => {
    return (
      <div className="flex flex-col gap-2 w-48 py-2">
        <label
          htmlFor="temperature"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Select temperature
        </label>
        {temperatureType && (
          <select
            onChange={(e) =>changeTemperature(e)}
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
    );
  };

  const renderCitySearch = () => {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor="location"
          className="text-md font-semibold text-gray-700 dark:text-gray-200 py-1"
        >
          City
        </label>
        <div className="flex">
          <div className="relative">
          <input
            type="text"
            name="location"
            id="location"
            onChange={(e) =>setCityName(e)
             
            }
            defaultValue={searchText ?? ''}
            placeholder="Search weather by city"
            onKeyDown={(e) =>e.key === "Enter" && searchByCity()}
            className="
        border border-gray-300 dark:border-gray-600
        rounded-l-md
        w-45
        px-3 py-2
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
        transition-colors duration-200
      "
          />
          {loading && <div className="absolute right-0 top-2 "><Loader2 className="animate-spin" /> </div>}
          </div>
          <button
            onClick={() => searchByCity()}
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
            Search
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <FilterSection title={"WEATHER"} defaultOpen={false} expanded={expanded as boolean}>
        <WeatherSearchBar setCityName={setCityName } searchText={searchText ?? ''} searchByCity={searchByCity} loading={loading}/>
        {renderTemperatureSelector()}
      </FilterSection>
    </>
  );
};

export default WeatherFilters;
