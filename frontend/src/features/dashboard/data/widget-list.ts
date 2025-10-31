//  WIDGETS COMPONENTS
import { lazy } from "react";

const CryptoWidget = lazy(() => import("../components/Widgets/CryptoWidget"));
const NasaWidget = lazy(() => import("../components/Widgets/NasaWidget"));
const GithubWidget = lazy(() => import("../components/Widgets/GithubWidget"));
const WeatherWidget = lazy(() => import("../components/Widgets/WeatherWidget"));

export const getWidgetList = (filters: any) => {
  return [
    {
      component: WeatherWidget,
      widgetId: 1,
      visibility: filters.weather,
    },
    {
      component: GithubWidget,
      widgetId: 2,
      visibility: filters.github,
    },
    {
      component: CryptoWidget,
      widgetId: 3,
      visibility: filters.crypto,
    },
    {
      component: NasaWidget,
      widgetId: 4,
      visibility: filters.nasa,
    },
  ];
};
