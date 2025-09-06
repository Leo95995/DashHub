// Qui metto semplicemente insieme le mie sezioni (Niente business logic)
import DashBoardHeader from "./header/header";
import CryptoWidget from "./Widgets/CryptoWidget";
import KeyPerformanceIndicator from "./Widgets/KpiWidget";
import SocialWidget from "./Widgets/SocialWidget";
import WeatherWidget from "./Widgets/WeatherWidget";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-5 " >
        <DashBoardHeader />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6 border">
          <KeyPerformanceIndicator />
          <WeatherWidget/>
          <SocialWidget/>
          <CryptoWidget/>
        </section>
      </div>
    </>
  );
};

export default DashBoard;
