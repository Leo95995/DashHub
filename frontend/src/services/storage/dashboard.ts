import { storage } from "./storage";

const DASHBOARD_KEY = "dashboard";

const DashboardStorage = {


  // WIDGETS

  widgets: {
    getWidgetOrder: (): number[] => {
      const res = storage.getItem(`${DASHBOARD_KEY}_widgetOrder`);
      return res;
    },
    saveWidgetOrder: (toSaveOrder: number[]): void => {
      storage.setItem(`${DASHBOARD_KEY}_widgetOrder`, toSaveOrder);
    },


    // FILTERS
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
