import WeatherFilters from "./weather-filters";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
// Widget filters
import WidgetFilters from "./widget-filters";

const Filters: React.FC = () => {
  const sidebar = useSelector((state: any) => state.app.sideBar);
  const { expanded } = sidebar;

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (expanded) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300); 
      return () => clearTimeout(timeout);
    }
  }, [expanded]);

  if (!expanded && !show) return null;

  return (
    <div
      className={`h-full p-4 transform transition-all duration-300 
        ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
      `}
    >
      <h2 className="text-2xl mb-4"><b>Filtri</b></h2>
        <div> 
        <WidgetFilters expanded={expanded}/>
        </div>
      <div className="py-4">
        <WeatherFilters expanded={expanded} />
      </div>
    </div>
  );
};

export default Filters;
