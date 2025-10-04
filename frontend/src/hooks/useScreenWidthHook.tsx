import { useEffect, useState } from "react";
import { getCurrentMode } from "../utils/media-query";
import type { ScreenMode } from "../interfaces/common/interfaces";

interface WidgetLayout {
  grid_col: {
    large: number;
    medium: number;
    small: number;
  };
}

const useScreenWidthHook = (layout: WidgetLayout) => {
  const [screenWidth, setScreenWidth] = useState<number>();
  const [currentMode, setCurrentMode] = useState<ScreenMode>("desktop");
  useEffect(() => {
    const res = getCurrentMode(window.innerWidth);
    setCurrentMode(res);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
      const res = getCurrentMode(window.innerWidth);
      setCurrentMode(res);
    });
    window.removeEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
      console.log("removing");
    });
  }, []);

  const getLayoutByMode = () => {

    if(!layout?.grid_col){
      return "grid-cols-2"
    }

    switch (currentMode) {
      case "desktop":
        return layout.grid_col.large === 3
          ? "grid-cols-3"
          : layout.grid_col.large === 2
          ? "grid-cols-2"
          : "grid-cols-1";
      case "tablet":
        return layout.grid_col.medium === 2 ? "grid-cols-2" : "grid-cols-1";
      case "mobile":
        return "grid-cols-1";
    }
  };

  return { getLayoutByMode, screenWidth, currentMode };
};

export default useScreenWidthHook;
