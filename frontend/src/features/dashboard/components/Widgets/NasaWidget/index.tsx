import type React from "react";
// REACT
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWidget } from "../../../../../store/nasaSlice";
// Components
import WidgetContainer from "./SubWidgets/widgets_container";
import Switcher from "../../Switcher/switcher";
// Nasa widget datas
import { nasa_widgets } from "../../Switcher/datas";
// Interfaces
import type { IGenericWidget, WidgetTypes } from "../../../types";
// components
import Tag from "../../../../../components/Tag/Tag";
import { setGlobalAlert } from "../../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../../types/store/app";
import { useDragDrop } from "../../../../../hooks/useDragAndDrop";
import { useWidgetSelector } from "../../../hooks/UseWidgetSelector";
import { useNasaFetcher } from "./hooks/useNasaFetch";
import { WidgetOrigin } from "../../../hooks/types";

const NasaWidget: React.FC<IGenericWidget> = ({
  isEditMode,
  widgetId,
  handleDrop,
  setDraggedWidgetId,
}) => {
  const nasa_info = useSelector((state: any) => state.nasa);
  const dispatch = useDispatch();

  const { apodStatus, neoWsStatus, widgetSelected, cmeStatus } = nasa_info;

  const {
    dragging,
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
  } = useDragDrop({ widgetId, handleDrop, setDraggedWidgetId });

  useNasaFetcher(dispatch);

  // Widget selection
  const { currentSelection, setWidgetSelection } = useWidgetSelector({
    selector: () => widgetSelected,
    actionCreator: setSelectedWidget,
    origin: WidgetOrigin.NASA
  });

  const changeSelectedWidget = (newWidget: WidgetTypes) => {
    dispatch(
      setGlobalAlert({
        status: IGlobalAlertStatus.SUCCESS,
        message: "Success",
        description: `The widget selected for Nasa is ${newWidget}`,
      })
    );
    setWidgetSelection(newWidget);
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
              widgetSelected={currentSelection}
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
            widgetSelected={currentSelection}
          />
        </div>
      </div>
    </>
  );
};

export default NasaWidget;
