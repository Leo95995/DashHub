// Dashboard data
import MobileFilters from "../../../../components/Layout/PrivateLayout/MobileFilters";

import { isMobile } from "../../../../utils/media-query";
import type { IDashBoardHeader } from "./types";

import { useSaveWidget } from "./hooks/useSaveWidget";

const DashBoardHeader: React.FC<IDashBoardHeader> = ({
  userData,
  isEditMode,
  onClick,
  widgetOrder,
  screenWidth,
  visibleWidgets,
}) => {
  // Hooks responsible for saving the new widgets layout
  const { saveWidgetOrder } = useSaveWidget({
    onClick,
    isEditMode,
    widgetOrder,
  });

  return (
    <>
      <div
        className={`flex  flex-col md:flex-row ${
          isMobile(screenWidth) ? "px-4" : "px-6"
        } gap-5  `}
      >
        <div className="text-2xl font-bold m-0 duration-500">
          <div className="flex items-center gap-2 max-w-full overflow-hidden">
            <b className="flex-shrink-0">Welcome</b>
            <span className="text-blue-500 dark:text-blue-300 truncate max-w-[200px] md:max-w-[300px]">
              {userData?.userInfo?.username
                ? " " + userData.userInfo.username
                : " Guest"}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {visibleWidgets >= 2 ? (
            <button
              onClick={() => onClick(isEditMode)}
              className={`px-4 py-2 rounded-lg font-semibold disabled:bg-gray-200 transition duration-200 active:scale-95 cursor-pointer
  ${
    isEditMode
      ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg"
      : "animate-pulse bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md"
  }
`}
            >
              {isEditMode ? `Cancel` : "Edit Layout (Drag & Drop)"}
            </button>
          ) : (
            <></>
          )}
          {isEditMode && (
            <button
              onClick={saveWidgetOrder}
              className="px-4 py-2 rounded-lg  cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition"
            >
              Finish Editing
            </button>
          )}
          <MobileFilters />
        </div>
      </div>
    </>
  );
};

export default DashBoardHeader;
