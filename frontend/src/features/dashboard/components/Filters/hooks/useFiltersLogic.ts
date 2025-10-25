// React
import { useState, useEffect } from "react";
// Redux
import { useSelector } from "react-redux";

export const useFiltersLogic = () => {
  const { expanded } = useSelector((state: any) => state.app.sideBar);
  const [show, setShow] = useState(false);

  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );

  useEffect(() => {
    if (expanded) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [expanded]);

  return { show, filters, expanded };
};
