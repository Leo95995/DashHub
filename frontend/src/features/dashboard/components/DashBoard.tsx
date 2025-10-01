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

  const { getLayoutByMode, currentMode } = useScreenWidthHook(layout);

  useEffect(() => {
    dispatch(setLayoutMode(currentMode));
  }, [currentMode]);

  const toggleEditMode = (status: boolean) => {
    dispatch(setEditMode(!status));
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5 ">
        <DashBoardHeader userdata={userdata} isEditMode={isEditMode} onClick={toggleEditMode} />
        <section className={`grid gap-6 px-6 py-2 ${getLayoutByMode()}`}>
            <>
              {filters.weather && <WeatherWidget isEditMode={isEditMode} />}
              {filters.github && <GithubWidget isEditMode={isEditMode} />}
              {filters.nasa && <NasaWidget isEditMode={isEditMode} />}
              {filters.crypto && <CryptoWidget isEditMode={isEditMode} />}
            </>
        </section>
      </div>
    </>
  );
};

export default DashBoard;
