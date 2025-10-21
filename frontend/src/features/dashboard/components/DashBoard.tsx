//  REACT

import React, { useState, useId } from "react";

// ----- COMPONENTS -----

//  LAYOUT
import DashBoardHeader from "./Header/Header";

//  STORAGE
import DashboardStorage from "../../../services/storage/dashboard";
//  MEDIA QUERIES
import { isMobile } from "../../../utils/media-query";
//  HOOKS
import { useFullScreenApod } from "../hooks/useFullScreenApod";
import { useDashboardLogic } from "../hooks/useDashBoardLogic";
import { getWidgetList } from "../data/widget-list";
import type { DraggableWidget } from "../types";

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

  // We get the widget list
  const widgetList = getWidgetList(filters);

  const renderWidgetByOrder = () => {
    const orderedList: DraggableWidget[] = [];

    widgetOrder.map((number) => {
      const res = widgetList.find(
        (widget: DraggableWidget) => widget.widgetId === number
      );
      if (res) {
        orderedList.push(res);
      }
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

    // if not existent i exit
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
