import { useEffect, useState } from "react";
import DashBoardHeader from "./header/header";
import CryptoWidget from "./Widgets/CryptoWidget";
import GithubWidget from "./Widgets/GithubWidget";
import NasaWidget from "./Widgets/NasaWidget";
import WeatherWidget from "./Widgets/WeatherWidget";
import { useSelector } from "react-redux";
import useScreenWidthHook from "../../../hooks/useScreenWidthHook";
import { useDispatch } from "react-redux";
import { setLayoutMode } from "../../../store/filterSlice";
import { setEditMode } from "../../../store/appSlice";
import DashboardStorage from "../../../services/storage/dashboard";

const DashBoard: React.FC = () => {
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const layout = useSelector((state: any) => state.filters.widgetLayout);
  const appData = useSelector((state: any) => state.app);
  const { isEditMode, userdata } = appData;


  const storageWidgetOrder = DashboardStorage.widgets.getWidgetOrder()
  const dispatch = useDispatch();
  // The original widget order.
  const [widgetOrder, setWidgetOrder] = useState<number[]>(storageWidgetOrder ?? [3, 2, 1, 4]);
  // If not dragged, the id should be simply null.
  const [draggedWidgetId, setDraggedWidgetId] = useState<number | null>(null);

  const { getLayoutByMode, currentMode } = useScreenWidthHook(layout);

  useEffect(() => {
    dispatch(setLayoutMode(currentMode));
  }, [currentMode]);

  const toggleEditMode = (status: boolean) => {
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
      <div className="w-full flex flex-col gap-5 ">
        <DashBoardHeader
          userdata={userdata}
          isEditMode={isEditMode}
          onClick={toggleEditMode}
          widgetOrder={widgetOrder}
        />
        <section className={`grid gap-6 px-6 py-2 ${getLayoutByMode()}`}>
          <>
            {renderWidgetByOrder().map((widget: any) => {
              return (
                <>
                  {widget.visibility && (
                    <widget.component
                      widgetId={widget.widgetId}
                      onHide={widget.onHide}
                      isEditMode={isEditMode}
                      handleDrop={handleDrop}
                      setDraggedWidgetId={setDraggedWidgetId}
                    />
                  )}
                </>
              );
            })}
            {/* {renderWidgetByOrder()} */}
          </>
        </section>
      </div>
    </>
  );
};

export default DashBoard;
