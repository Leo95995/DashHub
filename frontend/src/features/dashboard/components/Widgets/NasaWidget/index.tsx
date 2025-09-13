import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_apod_data,
  fetch_mars_rover_data,
  fetch_neows_data,
  setSelectedWidget,
  type NasaWidgets,
} from "../../../../../store/nasaSlice";
import { useEffect } from "react";

import WidgetContainer from "./SubWidget/widgets_container";
import Switcher from "./WidgetSwitcher/switcher";

const NasaWidget: React.FC = () => {
  const nasa_info = useSelector((state: any) => state.nasa);
  // Apod
  const { apodStatus, neoWsStatus, widgetSelected, roverStatus } = nasa_info;

  // Neows

  //  Mars Rover
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_apod_data() as any);
    dispatch(fetch_neows_data() as any);
    dispatch(fetch_mars_rover_data() as any)
  }, []);

  // Function that trigger and change the current used widget.

  const changeSelectedWidget = (newWidget: NasaWidgets) => {
    dispatch(setSelectedWidget(newWidget));
  };

  return (
    <div className="relative min-w-64 col-span-1 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-4 shadow-2xl border border-gray-300 hover:scale-105 transform transition-all duration-300">
      <div>
        <Switcher changeSelectedWidget={changeSelectedWidget} />
        <WidgetContainer
          apodStatus={apodStatus}
          neoWStatus={neoWsStatus}
          roverStatus={roverStatus}
          widgetSelected={widgetSelected}
        />
      </div>
    </div>
  );
};

export default NasaWidget;
