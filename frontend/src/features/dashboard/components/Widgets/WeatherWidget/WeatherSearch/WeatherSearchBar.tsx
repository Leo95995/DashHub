// React import
import React from "react";
// Icons
import { Loader2 } from "lucide-react";
import type { IWeatherSearchBar } from "./types";

const WeatherSearchBar: React.FC<IWeatherSearchBar> = ({
  setCityName,
  searchText,
  searchByCity,
  loading,
  label,
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && <span className="font-semibold"> City </span>}
      <div className="flex w-full">
        <div className="relative w-full">
          <input
            type="text"
            name="location"
            id="location"
            aria-label={"City Name"}
            onChange={(e) => setCityName(e)}
            defaultValue={searchText ?? ""}
            placeholder="Search weather by city"
            onKeyDown={(e) => e.key === "Enter" && searchByCity()}
            className={`
        border border-gray-300 dark:border-gray-600
        flex-1
        rounded-l-md
        px-3 py-2
        w-full
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
        transition-colors duration-200
     `}
          />
          {loading && (
            <div className="absolute right-0 top-2 ">
              <Loader2 className="animate-spin" />{" "}
            </div>
          )}
        </div>
        <button
          onClick={() => searchByCity()}
          className="
        border border-gray-300 dark:border-gray-600 border-l-0
        rounded-r-md
        px-4 py-2
        bg-blue-600 dark:bg-blue-600
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

export default WeatherSearchBar;
