import { type Temperature } from "../../store/weatherSlice";
import type { IWeatherData, LocationCoordinates } from "../../types/services/weather";
import cryptoKey from "./crypto";
import githubKey from "./github";
import nasaKey from "./nasa";
import { storage } from "./storage";
import userInfo from "./user";

const DASHBOARD_KEY = "dashboard";

const DashboardStorage = {
  user: userInfo,
  widgets: {
    getWidgetOrder: (): number[] => {
      const res = storage.getItem(`${DASHBOARD_KEY}_widgetOrder`);
      return res;
    },
    saveWidgetOrder: (toSaveOrder: number[]): void => {
      storage.setItem(`${DASHBOARD_KEY}_widgetOrder`, toSaveOrder);
    },
    weatherWidget: {
        getCoordinates: () => {
          return storage.getItem(`${DASHBOARD_KEY}coordinates`)
        }, 
        setCoordinates: (coordinates: Partial<LocationCoordinates>)=> {
          storage.setItem(`${DASHBOARD_KEY}_coordinates`, coordinates)
        },
        getWeatherData: ()=> {
          return storage.getItem(`${DASHBOARD_KEY}_weatherData`)
        },
        setWeatherData: (weatherData: Partial<IWeatherData> )=> {
          storage.setItem(`${DASHBOARD_KEY}_weatherData`, weatherData)
        },
        getTemperatureType: ()=> {
         return storage.getItem(`${DASHBOARD_KEY}_temperature`)
        },
        setTemperatureType: (temperature: Temperature ) => {
           storage.setItem(`${DASHBOARD_KEY}_temperature`, temperature );
        }


    },
    nasaWidget: nasaKey,
    cryptoWidget: cryptoKey, 
    githubWidget: githubKey
  },
   filters: {
      saveWidgetVisibility: (widgetVisibility: { [key: string]: boolean }) => {
        storage.setItem(`${DASHBOARD_KEY}_widgetVisiblity`, widgetVisibility);
      },
      getWidgetVisibility: ()=>  {
        const visibility = storage.getItem(`${DASHBOARD_KEY}_widgetVisiblity`);
        return visibility
      },
      saveWidgetLayout: (widgeLayout: {grid_col: {[key:string]:number}}) => {
        storage.setItem(`${DASHBOARD_KEY}_widgetLayout`, widgeLayout);
      },
      getWidgetLayout: ()=>  {
        const widgetLayout = storage.getItem(`${DASHBOARD_KEY}_widgetLayout`);
        return widgetLayout
      }

    },
};

export default DashboardStorage;
