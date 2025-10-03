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
import { ListOrdered } from "lucide-react";

const DashBoard: React.FC = () => {
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const layout = useSelector((state: any) => state.filters.widgetLayout);
  const appData = useSelector((state: any) => state.app);
  const { isEditMode, userdata } = appData;

  console.log(appData);
  const dispatch = useDispatch();
  // The original widget order.
  const [widgetOrder, setWidgetOrder] = useState<number[]>([3, 2, 1, 4]);
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
      visibility: filters.github,
    },
  ];

  const renderWidgetByOrder = () => {
    const orderedList: any = [];

    widgetOrder.map((number) => {
      const res = widgetList.find((widget) => widget.widgetId === number);
      orderedList.push(res);
    });
    console.log(orderedList);
    return orderedList;
  };

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

    console.log("SWAP:", draggedWidgetId, "⇄", widgetId);
    console.log("AFTER:", newList);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5 ">
        <DashBoardHeader
          userdata={userdata}
          isEditMode={isEditMode}
          onClick={toggleEditMode}
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
                      setWidgetOrder={setWidgetOrder}
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
