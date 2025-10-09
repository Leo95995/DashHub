import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// Widget filters
import WidgetFilters from "./widget-filters";
import WeatherFilters from "./weather-filters";
import NasaFilters from "./nasa-filters";
import CryptoFilters from "./crypto-filters";
import GithubFilters from "./github-filters";

interface IFilters {
  isMobile?: boolean;
}

// JUST FUCKING GRIND E SARA MERAVIGLIOSO
const Filters: React.FC<IFilters> = ({ isMobile }) => {
  const sidebar = useSelector((state: any) => state.app.sideBar);
  const { expanded } = sidebar;

  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (expanded) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [expanded]);

  if (!expanded && !show && !isMobile) return null;

  return (
    <div
      className={`h-full p-4 mb-12 transform transition-all duration-300 overflow-scroll ${
        isMobile && "flex flex-col w-full  items-center"
      }
        ${
          expanded || isMobile
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4"
        }
      `}
    >
      <h2 className="text-2xl mb-4">
        <b>Filters</b>
      </h2>
      <div className="py-2">
        <WidgetFilters expanded={expanded || isMobile} />
      </div>
      {filters?.weather && (
        <div className="py-2">
          <WeatherFilters expanded={expanded || isMobile} />
        </div>
      )}

      {filters?.nasa && (
        <div className="py-2 pb-3">
          <NasaFilters expanded={expanded || isMobile} />
        </div>
      )}
      {filters?.crypto && (
        <div className="py-4">
          <CryptoFilters expanded={expanded || isMobile} />
        </div>
      )}
      {filters?.github && <div className="py-12"><GithubFilters expanded={expanded} /></div>}
    </div>
  );
};

export default Filters;
