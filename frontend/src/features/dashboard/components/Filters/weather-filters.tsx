// Filters for weathers
import type React from "react";
// Components
import FilterSection from "./filters-section";
import WeatherSearchBar from "../Widgets/WeatherWidget/WeatherSearch/WeatherSearchBar";
// Types
import type { IFilters } from "./types";
// Hook
import { useWeatherFilterLogic } from "./hooks/useWeatherFilterLogic";


const WeatherFilters: React.FC<IFilters> = ({ expanded }) => {

  //  Weather hook custom
  const {loading, searchText, changeTemperature, searchByCity,setCityName, temperatureType} = useWeatherFilterLogic()

  const renderTemperatureSelector = () => {
    return (
      <div className="flex flex-col gap-2 w-48 py-2">
        <span
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Select temperature
        </span>
        {temperatureType && (
          <select
          data-testid="temp_filter"
            onChange={(e) =>changeTemperature(e)}
            value={temperatureType}
            name="temperature"
            aria-label="temperature"
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
            <option  value={"kelvin"}>Kelvin</option>
          </select>
        )}
      </div>
    );
  };

  return (
    <>
      <FilterSection testId="weather" title={"WEATHER"} defaultOpen={false} expanded={expanded as boolean}>
        <WeatherSearchBar testId="filter_weather_search" label setCityName={setCityName } searchText={searchText ?? ''} searchByCity={searchByCity} loading={loading}/>
        {renderTemperatureSelector()}
      </FilterSection>
    </>
  );
};

export default WeatherFilters;
