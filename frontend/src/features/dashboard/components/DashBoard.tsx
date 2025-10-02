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
  const [widgetOrder, setWidgetOrder] = useState<number[]>([]);
  // If not dragged, the id should be simply null.
  const [draggedWidgetId, setDraggedWidgetId] = useState<number | null>(null);

  const { getLayoutByMode, currentMode } = useScreenWidthHook(layout);

  useEffect(() => {
    dispatch(setLayoutMode(currentMode));
  }, [currentMode]);

  const toggleEditMode = (status: boolean) => {
    dispatch(setEditMode(!status));
  };

  // List of which to iterate
  const widgetList = [
    {
      component: WeatherWidget,
      widgetId: 1,
      onHide: () => console.log(`Hide`),
    },
     {
      component: WeatherWidget,
      widgetId: 2,
      onHide: () => console.log(`Hide`),
    },
     {
      component: WeatherWidget,
      widgetId: 3,
      onHide: () => console.log(`Hide`),
      visibility: filters.We

    },
     {
      component: GithubWidget,
      widgetId: 4,
      onHide: () => console.log(`Hide`),
      visibility: filters.github
    },



  ];

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
            {filters.weather && (
              <WeatherWidget
                isEditMode={isEditMode}
                widgetId={1}
                onHide={() => console.log("Hiding the widget")}
              />
            )}
            {filters.github && (
              <GithubWidget
                isEditMode={isEditMode}
                widgetId={2}
                onHide={() => console.log("Hiding the widget")}
              />
            )}
            {filters.nasa && (
              <NasaWidget
                isEditMode={isEditMode}
                widgetId={3}
                onHide={() => console.log("Hiding the widget")}
              />
            )}
            {filters.crypto && (
              <CryptoWidget
                isEditMode={isEditMode}
                widgetId={4}
                onHide={() => console.log("Hiding the widget")}
              />
            )}
          </>
        </section>
      </div>
    </>
  );
};

export default DashBoard;
