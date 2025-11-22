//  REACT
import React, { lazy, Suspense, useId, useMemo } from "react";
//  LAYOUT
const DashBoardHeader = lazy(() => import("./Header/Header"));
//  MEDIA QUERIES
import { isMobile } from "../../../utils/media-query";
//  HOOKS
import { useFullScreenApod } from "../hooks/useFullScreenApod";
import { useDashboardLogic } from "../hooks/useDashBoardLogic";
import { useWidgetRender } from "../hooks/useWidgetRender";
import { getWidgetList } from "../data/widget-list";
import { DraggableWidget } from "../types";

const DashBoard: React.FC = () => {
  const {
    filters,
    isEditMode,
    userData,
    getLayoutByMode,
    screenWidth,
    toggleEditMode,
  } = useDashboardLogic();

  const widgetList = useMemo(() => getWidgetList(filters), [filters]);
  const {
    getVisibleWidgetsNumber,
    handleDrop,
    renderWidgetByOrder,
    widgetOrder,
    setDraggedWidgetId,
  } = useWidgetRender(filters, widgetList);

  return (
    <>
      {useFullScreenApod()}
      <div className="w-full flex flex-col gap-5 ">
        <Suspense fallback="loading">
          <DashBoardHeader
            userData={userData}
            isEditMode={isEditMode}
            testId="dashboard_header"
            onClick={toggleEditMode}
            widgetOrder={widgetOrder}
            screenWidth={screenWidth}
            visibleWidgets={getVisibleWidgetsNumber()}
          />
        </Suspense>
        <section
          className={`grid gap-6 ${
            isMobile(screenWidth) ? "pt-y px-4" : "px-8 py-8"
          } flex-wrap h-190  overflow-y-scroll overflow-x-hidden ${getLayoutByMode()}`}
        >
          <>
            {renderWidgetByOrder().map((widget: DraggableWidget) => {
              const id = useId();
              return (
                <React.Fragment key={id}>
                  {widget.visibility && (
                    <Suspense fallback="Caricamento widget">
                      <widget.component
                        testId={`widget-${widget.widgetId}`}
                        widgetId={widget.widgetId}
                        isEditMode={isEditMode}
                        handleDrop={handleDrop}
                        setDraggedWidgetId={setDraggedWidgetId}
                      />
                    </Suspense>
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
