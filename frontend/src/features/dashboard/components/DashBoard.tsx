// Qui metto semplicemente insieme le mie sezioni (Niente business logic)
import DashBoardHeader from "./header/header";
import CryptoWidget from "./Widgets/CryptoWidget";
import KeyPerformanceIndicator from "./Widgets/KpiWidget";
import SocialWidget from "./Widgets/SocialWidget";
import WeatherWidget from "./Widgets/WeatherWidget";
import { useSelector } from "react-redux";
const DashBoard: React.FC = () => {
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );

  const layout = useSelector((state: any) => state.filters.widgetLayout);

  console.log(layout);


  return (
    <>
      <div className="w-full flex flex-col gap-5 ">
        <DashBoardHeader />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6 ">
         {filters.weather && <WeatherWidget />}
          {filters.kpi && <KeyPerformanceIndicator />}
         {filters.social && <SocialWidget />}
         {filters.crypto && <CryptoWidget />}
        </section>
      </div>
    </>
  );
};

export default DashBoard;
