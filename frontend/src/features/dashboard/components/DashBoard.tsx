import React, { useState, useId } from "react";
import DashBoardHeader from "./Header/Header";
import CryptoWidget from "./Widgets/CryptoWidget";
import GithubWidget from "./Widgets/GithubWidget";
import NasaWidget from "./Widgets/NasaWidget";
import WeatherWidget from "./Widgets/WeatherWidget";
import DashboardStorage from "../../../services/storage/dashboard";
import { isMobile } from "../../../utils/media-query";
import { useFullScreenApod } from "../hooks/useFullScreenApod";
import { useDashboardLogic } from "../hooks/useDashBoardLogic";

const DashBoard: React.FC = () => {

  const {
    filters,
    isEditMode,
    userData,
    getLayoutByMode,
    screenWidth,
    toggleEditMode,
  } = useDashboardLogic();

  const storageWidgetOrder = DashboardStorage.widgets.getWidgetOrder();
  const [widgetOrder, setWidgetOrder] = useState<number[]>(
    storageWidgetOrder ?? [1, 4, 2, 3]
  );
  const [draggedWidgetId, setDraggedWidgetId] = useState<number | null>(null);



  const widgetList = [
    {
      component: WeatherWidget,
      widgetId: 1,
      visibility: filters.weather,
    },
    {
      component: GithubWidget,
      widgetId: 2,
      visibility: filters.github,
    },
    {
      component: CryptoWidget,
      widgetId: 3,
      visibility: filters.crypto,
    },
    {
      component: NasaWidget,
      widgetId: 4,
      visibility: filters.nasa,
    },
  ];

  const renderWidgetByOrder = () => {
    const orderedList: any = [];

    widgetOrder.map((number) => {
      const res = widgetList.find((widget) => widget.widgetId === number);
      orderedList.push(res);
    });
    return orderedList;
  };

  /**
   * Func used to track the dragging and the drop with the new order
   *
   * @param widgetId
   * @returns
   */
  const handleDrop = (widgetId: number) => {
    if (draggedWidgetId === null) return;

    const indexOfDragged = widgetOrder.indexOf(draggedWidgetId);
    const indexOfDroppedOn = widgetOrder.indexOf(widgetId);

    if (indexOfDragged === -1 || indexOfDroppedOn === -1) return;

    const newList = [...widgetOrder];

    [newList[indexOfDragged], newList[indexOfDroppedOn]] = [
      newList[indexOfDroppedOn],
      newList[indexOfDragged],
    ];

    setWidgetOrder(newList);
    setDraggedWidgetId(null);
  };

  return (
    <>
      {useFullScreenApod()}
      <div className="w-full flex flex-col gap-5 ">
        <DashBoardHeader
          userData={userData}
          isEditMode={isEditMode}
          onClick={toggleEditMode}
          widgetOrder={widgetOrder}
          screenWidth={screenWidth}
        />
        <section
          className={`grid gap-6 ${
            isMobile(screenWidth) ? "pt-y px-4" : "px-8 py-8"
          } flex-wrap h-190  overflow-y-scroll overflow-x-hidden ${getLayoutByMode()}`}
        >
          <>
            {renderWidgetByOrder().map((widget: any) => {
              const id = useId();
              return (
                <React.Fragment key={id}>
                  {widget.visibility && (
                    <widget.component
                      widgetId={widget.widgetId}
                      onHide={widget.onHide}
                      isEditMode={isEditMode}
                      handleDrop={handleDrop}
                      setDraggedWidgetId={setDraggedWidgetId}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </>
        </section>
      </div>
    </>
  );
};

export default DashBoard;
