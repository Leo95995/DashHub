// Redux
import { useDispatch } from "react-redux";
//  React
import React, { useEffect, useState } from "react";
//  Types
import type { IApodWidget } from "../types";
//  Slice
import { setFullScreenImage } from "../../../../../../store/nasaSlice";
import { fetch_apod_data } from "../../../../../../store/nasaSlice";
//  Icon
import { Calendar } from "lucide-react";
// Components
import LoaderWithMessage from "../../../../../../components/Loaders/LoaderWithMessage";
import { useGlobalAlert } from "../../../../../../hooks/useAlert";
import { IGlobalAlertStatus } from "../../../../../../types/store/app";
import { createProxyUrl } from "../../../../../../utils/url-utils";
import { useLcpPreloader } from "./hooks/useApodPreload";

const ApodWidget: React.FC<IApodWidget> = ({ data, error, loading }) => {
  const { date, _id, img, description, title } = data;
  const dispatch = useDispatch();
  const [showEnlarge, setShowEnlarge] = useState<boolean>(false);

  useLcpPreloader(createProxyUrl(img));
  const { handleAlert } = useGlobalAlert();

  useEffect(() => {
    if (Object.keys(data)?.length) {
    }
  }, [data]);

  if (error) {
    return <>Errore nel caricamento</>;
  }

  return (
    <React.Fragment key={_id}>
      <div
        onMouseEnter={() => {
          setShowEnlarge(true);
        }}
        onMouseLeave={() => {
          setShowEnlarge(false);
        }}
      >
        <div className="flex justify-end px-2 items-center mb-2 text-sm  dark:text-gray-400">
          <span className="inline-flex items-center gap-1 text-gray-600 dark:text-white text-sm">
            <Calendar size={16} />
            {new Date(date).toLocaleDateString("it-IT", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <h3 className="text-lg font-bold text-center  dark:text-gray-200 mb-1 drop-shadow-md">
          Nasa Picture Of The Day
        </h3>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-3 font-medium text-sm">
          {title}
        </p>

        <div className="relative rounded-2xl mb-3 w-full max-w-[12rem] flex justify-end aspect-square mx-auto overflow-hidden shadow-lg">
          {loading ? (
            <LoaderWithMessage text=" Loading Nasa Picture of the day" />
          ) : (
            <img
              fetchPriority="high"
              alt="Nasa Pic of the day"
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 hover:scale-110"
              onClick={() =>
                dispatch(setFullScreenImage({ isFullScreen: true, url: img }))
              }
              src={img ? createProxyUrl(img):''}
            />
          )}
          {showEnlarge && (
            <div className="flex justify-center  text-xs absolute bottom-0 w-full text-white z-99">
              <span className="flex   py-2">Click to view fullscreen</span>
            </div>
          )}
        </div>
        <p className="text-black-500 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 overflow-ellipsis">
          {description}
        </p>
        <div className="flex py-2 justify-center">
          <button
            className="p-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md cursor-pointer"
            onClick={async () => {
              await dispatch(fetch_apod_data() as any);
              handleAlert(
                IGlobalAlertStatus.SUCCESS,
                "Success",
                `Recovered data for apod ${data.title} of date ${data.date}`
              );
            }}
          >
            Explore the cosmos
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ApodWidget;
