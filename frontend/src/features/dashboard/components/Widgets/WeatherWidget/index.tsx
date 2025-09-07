import type React from "react";
import { useSelector } from "react-redux";
import {
  background_color,
  get_temperatures,
  getHoursAndMin,
} from "../../../../../utils/weather-utils";
import ReactLoader from "../../../../../components/loader";
import {Wind, Droplet, Gauge} from 'lucide-react'


const WeatherWidget: React.FC = () => {
  const weatherData = useSelector((state: any) => state.weather);

  const { coordinates, weather, temperatureType, loading, error } = weatherData;

  const renderLoading = () => (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-4 text-lg bg-white/60 dark:bg-black/40 transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      Caricamento dati.. <ReactLoader />
    </div>
  );

  const renderError = () => {
    if (error) {
      return (
        <div className="p-6 text-center text-red-600 dark:text-red-400">
          ❌ Errore nel caricamento dei dati meteo
        </div>
      );
    }
  };

  const renderWeather = () => {
    if (!coordinates || !weather || !weather.main || error) return null;

    const { name, state, country } = coordinates;
    const weatherInfo =
      weather?.weather && weather.weather.length > 0 && weather.weather[0];
    const { main } = weather;
    const { humidity, pressure, temp_min, temp_max, temp } = main;

    const { standard, min, max } = get_temperatures(
      temp,
      temp_min,
      temp_max,
      temperatureType
    );

    return (
     <div className="transition-opacity duration-500">
  <div className="flex items-center justify-between">
    <h3 className="text-2xl font-bold flex gap-2 items-center">
      {name}, {state}
      <img
        width={50}
        decoding="async"
        loading="lazy"
        src={`http://catamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
        alt="flag"
      />
    </h3>
    <img
      src={`http://openweathermap.org/img/wn/${weatherInfo?.icon}@2x.png`}
      alt="weather"
      width={100}
      decoding="async"
      loading="lazy"
      className="animate-bounce-slow"
    />
  </div>

  <p className="text-xl my-2 capitalize text-gray-700 dark:text-gray-200 font-medium">
    {weatherInfo?.main}
  </p>

  <div className="mt-4">
    <p className="font-semibold text-lg mb-2">Temperature</p>
    <div className="flex justify-between px-2 gap-4 text-center">
      <div>
        <p className={`text-lg font-bold text-gray-900  dark:text-white`}>{standard}</p>
        <span className="text-sm text-gray-800 dark:text-gray-200">Current</span>
      </div>
      <div>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{min}</p>
        <span className="text-sm text-gray-800 dark:text-gray-200">Min</span>
      </div>
      <div>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{max}</p>
        <span className="text-sm text-gray-800 dark:text-gray-200">Max</span>
      </div>
    </div>
  </div>

  <div className="mt-6 flex justify-between gap-6 text-center">
    <div className="flex flex-col items-center">
      <span className="text-xl"><Wind /></span>
      <p className="font-semibold text-gray-900 dark:text-white">{weather.wind.speed} m/s</p>
      <p className="text-sm text-gray-800 dark:text-gray-200">{weather.wind.deg}°</p>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-xl"><Droplet/></span>
      <p className="font-semibold text-gray-900 dark:text-white">{humidity}%</p>
      <p className="text-sm text-gray-800 dark:text-gray-200">Humidity</p>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-xl"><Gauge/></span>
      <p className="font-semibold text-gray-900 dark:text-white">{pressure} hPa</p>
      <p className="text-sm text-gray-800 dark:text-gray-200">Pressure</p>
    </div>
  </div>

  <div className="mt-6 flex justify-around gap-4">
    <div className="bg-yellow-200/30 dark:bg-yellow-700/30 rounded-lg px-2 py-1 flex items-center gap-1 text-gray-900 dark:text-white">
      🌅 {getHoursAndMin(weather.sys.sunrise)}
    </div>
    <div className="bg-orange-200/30 dark:bg-orange-700/30 rounded-lg px-2 py-1 flex items-center gap-1 text-gray-900 dark:text-white">
      🌇 {getHoursAndMin(weather.sys.sunset)}
    </div>
  </div>
</div>
    );
  };

  const weatherInfo =
    weather?.weather && weather.weather.length > 0 && weather.weather[0];
  return (
    <div
      className={`relative hover:scale-105 duration-300 min-h-100 col-span-1 rounded-2xl p-6 shadow-2xl bg-gradient-to-r ${background_color(weatherInfo?.main ?? "clear")} overflow-hidden`}
    >
      {renderError()}
      {renderWeather()}
      {renderLoading()}
    </div>
  );
};

export default WeatherWidget;
