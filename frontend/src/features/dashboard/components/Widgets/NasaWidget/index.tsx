import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_apod_data } from "../../../../../store/nasaSlice";
import { useEffect } from "react";
import NasaService from "../../../../../services/nasa-service";

const NasaWidget: React.FC = () => {
  const nasa_info = useSelector((state: any) => state.nasa);
  const { nasa_apod_data } = nasa_info;
  const { date, explanation, url, title } = nasa_apod_data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_apod_data() as any);
  }, []);

  /**
   * add ui like in the weather WIDGET . USE SAME LOGIC AND TRANSITION
   */

  return (
    <div
      className="relative col-span-1 min-w-20 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-blue-50

 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-4 shadow-2xl border border-gray-300 hover:scale-105 transform transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-2 text-sm  dark:text-gray-400">
        <span>{date}</span>
        <button className="border px-3 py-1 rounded-md cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200 text-xs">
          Change widget
        </button>
      </div>
      <h3 className="text-lg font-bold text-center  dark:text-gray-200 mb-1 drop-shadow-md">
        NASA APOD
      </h3>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-3 font-medium text-sm">
        {title}
      </p>
      <div className="relative rounded-2xl mb-3 w-full max-w-[12rem] aspect-square mx-auto overflow-hidden shadow-lg">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          src={url}
          alt={title}
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>
      <p className="text-black-500 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 overflow-ellipsis">
        {explanation}
      </p>
    </div>
  );
};

export default NasaWidget;
