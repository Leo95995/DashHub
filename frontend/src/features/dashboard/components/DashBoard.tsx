import DashBoardHeader from "./header/header";
import CryptoWidget from "./Widgets/CryptoWidget";
import GithubWidget from "./Widgets/GithubWidget";
import NasaWidget from "./Widgets/NasaWidget";
import WeatherWidget from "./Widgets/WeatherWidget";
import { useSelector } from "react-redux";
const DashBoard: React.FC = () => {
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );

  const layout = useSelector((state: any) => state.filters.widgetLayout);

  return (
    <>
      <div className="w-full flex flex-col gap-5 ">
        <DashBoardHeader />
        <section
          className={`grid gap-6 px-6 py-2 ${
            layout.grid_col.large === 3
              ? "grid-cols-3"
              : layout.grid_col.large === 2
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}
        >
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
