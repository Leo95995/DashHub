import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_apod_data,
  fetch_mars_rover_data,
  fetch_neows_data,
  setSelectedWidget,
} from "../../../../../store/nasaSlice";
import type { WidgetTypes } from "../../widgetSwitcher/types";
import { useEffect, useState } from "react";

import WidgetContainer from "./SubWidgets/widgets_container";
import Switcher from "../../widgetSwitcher/switcher";
import { nasa_widgets } from "../../widgetSwitcher/datas";
import type { IGenericWidget } from "../../../interfaces";
import Tag from "../../../../../components/Tag";

const NasaWidget: React.FC<IGenericWidget> = ({
  isEditMode,
  widgetId,
  handleDrop,
  setDraggedWidgetId,
}) => {
  const nasa_info = useSelector((state: any) => state.nasa);
  // Apod
  const { apodStatus, neoWsStatus, widgetSelected, roverStatus } = nasa_info;
  const [dragging, setDragging] = useState<boolean>(false);
  // Neows

  console.log(widgetSelected);
  //  Mars Rover
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_apod_data() as any);
    dispatch(fetch_neows_data() as any);
    dispatch(fetch_mars_rover_data() as any);
  }, []);

  // Function that trigger and change the current used widget.

  const changeSelectedWidget = (newWidget: WidgetTypes) => {
    dispatch(setSelectedWidget(newWidget));
  };

  return (
    <>
      <div
        draggable={isEditMode}
        onDragStart={() => {
          setDragging(true);
          setDraggedWidgetId(widgetId);
        }}
        onDragEnd={() => {
          setDragging(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(widgetId)}
        className={`relative min-w-64 min-h-110 col-span-1 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-blue-50
       dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-4 shadow-2xl border border-gray-300 hover:scale-105 transform 
       ${isEditMode && "ring-2 ring-blue-400 hover:scale-105 cursor-grab"}
       ${
         dragging
           ? "scale-95 shadow-2xl cursor-grabbing ring-4 ring-blue-500"
           : ""
       }
       transition-all duration-300`}
      >
        <div>
          <div className="flex gap-5 justify-between items-center">
            <Switcher
              widgetList={nasa_widgets}
              widgetSelected={widgetSelected}
              changeSelectedWidget={changeSelectedWidget}
              switcherButtonText="Change Nasa Widget"
            />
            {isEditMode ? <Tag text="Edit Mode" /> : <span>No edit mode</span>}
          </div>
          <WidgetContainer
            apodStatus={apodStatus}
            neoWStatus={neoWsStatus}
            roverStatus={roverStatus}
            widgetSelected={widgetSelected}
          />
        </div>
      </div>
    </>
  );
};

export default NasaWidget;
