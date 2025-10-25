//  WIDGETS COMPONENTS
import CryptoWidget from "../components/Widgets/CryptoWidget";
import GithubWidget from "../components/Widgets/GithubWidget";
import NasaWidget from "../components/Widgets/NasaWidget";
import WeatherWidget from "../components/Widgets/WeatherWidget";

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
