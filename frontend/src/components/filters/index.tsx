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
      className={`${isMobile ?   "flex flex-col h-150 overflow-scroll items-center":  "px-4 transform transition-all duration-300 h-200 overflow-scroll"}
       
      }
        ${
          expanded || isMobile
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4"
        }
      `}
    >
     
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
        <div className="py-2 pb-3">
          <CryptoFilters expanded={expanded || isMobile} />
        </div>
      )}
      {filters?.github && <div className="py-2 pb-3"><GithubFilters expanded={expanded} /></div>}
    </div>
  );
};

export default Filters;
