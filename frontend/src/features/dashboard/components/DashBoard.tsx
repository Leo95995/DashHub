//  REACT
import React, { useId } from "react";
// ----- COMPONENTS -----
//  LAYOUT
import DashBoardHeader from "./Header/Header";
//  MEDIA QUERIES
import { isMobile } from "../../../utils/media-query";
//  HOOKS
import { useFullScreenApod } from "../hooks/useFullScreenApod";
import { useDashboardLogic } from "../hooks/useDashBoardLogic";

import { useWidgetRender } from "../hooks/useWidgetRender";

const DashBoard: React.FC = () => {
  const {
    filters,
    isEditMode,
    userData,
    getLayoutByMode,
    screenWidth,
    toggleEditMode,
  } = useDashboardLogic();

  const {getVisibleWidgetsNumber, handleDrop, renderWidgetByOrder, widgetOrder, setDraggedWidgetId}  = useWidgetRender(filters)

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
          visibleWidgets={getVisibleWidgetsNumber()}
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
