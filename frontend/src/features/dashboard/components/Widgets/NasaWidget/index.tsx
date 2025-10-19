import type React from "react";
// REACT
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetch_apod_data,
  fetch_neows_data,
  fetch_cme_data,
  setSelectedWidget,
} from "../../../../../store/nasaSlice";
// Components
import WidgetContainer from "./SubWidgets/widgets_container";
import Switcher from "../../Switcher/switcher";
// Nasa widget datas
import { nasa_widgets } from "../../Switcher/datas";
// Interfaces
import type { IGenericWidget, WidgetTypes } from "../../../types";
// Tag components
import Tag from "../../../../../components/Tag/Tag";
import { setGlobalAlert } from "../../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../../types/store/app";
import { useDragDrop } from "../../../../../hooks/useDragAndDrop";

const NasaWidget: React.FC<IGenericWidget> = ({
  isEditMode,
  widgetId,
  handleDrop,
  setDraggedWidgetId,
}) => {
  const nasa_info = useSelector((state: any) => state.nasa);
  // Apod
  const { apodStatus, neoWsStatus, widgetSelected, cmeStatus } = nasa_info;

    const {
      dragging,
      dragStartHandler,
      dragEndHandler,
      dragOverHandler,
      dropHandler,
    } = useDragDrop({ widgetId, handleDrop, setDraggedWidgetId });
  
  // Neows

  //  Mars Rover
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_apod_data() as any);
    dispatch(fetch_neows_data() as any);
    dispatch(fetch_cme_data() as any);
  }, []);

  // Function that trigger and change the current used widget.

  const changeSelectedWidget = (newWidget: WidgetTypes) => {
    dispatch(
      setGlobalAlert({
        status: IGlobalAlertStatus.SUCCESS,
        message: "Success",
        description: `The widget selected for Nasa is ${newWidget}`
      })
    );
    dispatch(setSelectedWidget(newWidget));
  };

  return (
    <>
      <div
        draggable={isEditMode}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        className={`relative min-w-64 h-120 col-span-1 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-blue-50
       dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 p-6 shadow-2xl border border-gray-300 hover:scale-105 transform 
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
              switcherButtonText="Change Widget"
              switcherTitle="Select the Nasa widget"
            />
            {isEditMode && <Tag text="Edit Mode" />}
          </div>
          <WidgetContainer
            apodStatus={apodStatus}
            neoWStatus={neoWsStatus}
            cmeStatus={cmeStatus}
            widgetSelected={widgetSelected}
          />
        </div>
      </div>
    </>
  );
};

export default NasaWidget;
