import React, { useEffect, useState, useId } from "react";
import DashBoardHeader from "./header/header";
import CryptoWidget from "./Widgets/CryptoWidget";
import GithubWidget from "./Widgets/GithubWidget";
import NasaWidget from "./Widgets/NasaWidget";
import WeatherWidget from "./Widgets/WeatherWidget";
import { useSelector } from "react-redux";
import useScreenWidthHook from "../../../hooks/useScreenWidthHook";
import { useDispatch } from "react-redux";
import { setLayoutMode} from "../../../store/filterSlice";
import { setEditMode, setGlobalAlert } from "../../../store/appSlice";
import DashboardStorage from "../../../services/storage/dashboard";
import { setFullScreenImage } from "../../../store/nasaSlice";
import { isMobile } from "../../../utils/media-query";
import { IGlobalAlertStatus } from "../../../components/alert/alert";

const DashBoard: React.FC = () => {
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const layout = useSelector((state: any) => state.filters.widgetLayout);
  const appData = useSelector((state: any) => state.app);
  const { isEditMode, userData } = appData;

  const { url, isFullScreen } = useSelector(
    (state: any) => state.nasa.apodStatus.fullScreenImage
  );
  // Apod

  const storageWidgetOrder = DashboardStorage.widgets.getWidgetOrder();
  const dispatch = useDispatch();
  // The original widget order.
  const [widgetOrder, setWidgetOrder] = useState<number[]>(
    storageWidgetOrder ?? [1, 4, 2, 3]
  );
  // If not dragged, the id should be simply null.
  const [draggedWidgetId, setDraggedWidgetId] = useState<number | null>(null);

  const { getLayoutByMode, currentMode, screenWidth } =
    useScreenWidthHook(layout);

  useEffect(() => {
    dispatch(setLayoutMode(currentMode));
  }, [currentMode]);

  const toggleEditMode = (status: boolean) => {
    dispatch(
      setGlobalAlert({
        status: IGlobalAlertStatus.SUCCESS,
        message: "Success",
        description: !status ? `Drag and Drop mode is now ON` : `Drag and Drop mode is now OFF`,
      })
    );
    dispatch(setEditMode(!status));
  };

  // List of which to iterate to create the widget list
  const widgetList = [
    {
      component: WeatherWidget,
      widgetId: 1,
      onHide: () => console.log(`Hide`),
      visibility: filters.weather,
    },
    {
      component: GithubWidget,
      widgetId: 2,
      onHide: () => console.log(`Hide`),
      visibility: filters.github,
    },
    {
      component: CryptoWidget,
      widgetId: 3,
      onHide: () => console.log(`Hide`),
      visibility: filters.crypto,
    },
    {
      component: NasaWidget,
      widgetId: 4,
      onHide: () => console.log(`Hide`),
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
      {isFullScreen && url !== null && (
        <div
          onClick={() =>
            dispatch(setFullScreenImage({ isFullScreen: false, url: null }))
          }
          className="fixed inset-0 z-[999999] bg-black/90 py-10 rounded-xs flex items-center  justify-center cursor-zoom-out"
        >
          <img
            src={url}
            alt="Fullscreen"
            fetchPriority="high"
            className="max-w-full max-h-full object-contain rounded-xl border border-transparent hover:border-white/30 transition-all duration-400  hover:scale-105"
          />
          <div className="absolute -inset-2 rounded-xl pointer-events-none border border-white/20 shadow-[0_0_40px_10px_rgba(255,255,255,0.1)]"></div>
        </div>
      )}
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
