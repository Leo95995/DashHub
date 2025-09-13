import { useEffect } from "react";
import DashBoardHeader from "./header/header";
import CryptoWidget from "./Widgets/CryptoWidget";
import GithubWidget from "./Widgets/GithubWidget";
import NasaWidget from "./Widgets/NasaWidget";
import WeatherWidget from "./Widgets/WeatherWidget";
import { useSelector } from "react-redux";
import useScreenWidthHook from "../../../hooks/useScreenWidthHook";

import { useDispatch } from "react-redux";
import { setLayoutMode } from "../../../store/filterSlice";

const DashBoard: React.FC = () => {
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const layout = useSelector((state: any) => state.filters.widgetLayout);
  const dispatch = useDispatch();

  const { getLayoutByMode, currentMode } = useScreenWidthHook(layout);

  useEffect(() => {
    dispatch(setLayoutMode(currentMode));
  }, [currentMode]);

  return (
    <>
      <div className="w-full flex flex-col gap-5 ">
        <DashBoardHeader />
        <section className={`grid gap-6 px-6 py-2 ${getLayoutByMode()}`}>
          {filters.weather && <WeatherWidget />}
          {filters.github && <GithubWidget />}
          {filters.nasa && <NasaWidget />}
          {filters.crypto && <CryptoWidget />}
        </section>
      </div>
    </>
  );
};

export default DashBoard;
