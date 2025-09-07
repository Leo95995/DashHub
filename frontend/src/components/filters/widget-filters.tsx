// Filters for weathers

import type React from "react";
import { useDispatch } from "react-redux";
import { setTemperatureType } from "../../store/weatherSlice";
import CheckboxGroup from "../checkbox/checkboxGroup";
import { changeWidgetVisibility } from "../../store/filterSlice";
import type { IFilters } from "../../store/interfaces/interfaces";
import { filterUtils } from "../../utils/filter-utils";
import { useSelector } from "react-redux";

interface IWidgetFilters {
  expanded: boolean;
}

const WidgetFilters: React.FC<IWidgetFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const layout = useSelector(
    (state: any) => state.filters.widgetLayout
  );

  const changeVisibility = (
    widget: keyof IFilters["widgetVisibility"],
    visibility: boolean
  ) => {
    dispatch(
      changeWidgetVisibility({ widget: widget, visibility: visibility })
    );
  };

  const optionlist = filterUtils(filters);

  return (
    <div
      className={`h-full transform transition-all duration-300 overflow-hidden 
    ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      <h2 className="text-md font-semibold mb-4 text-gray-700 dark:text-blue-300">
        Impostazioni widget
      </h2>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="location"
          className="text-md font-semibold text-gray-700 dark:text-gray-200 py-1"
        >
          Widget Visibili
        </label>
        <div className="flex">
          <CheckboxGroup
            selectedList={filters}
            options={optionlist}
            onChange={changeVisibility}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-60 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="mb-2">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Layout Widget
          </p>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Numero di widget per colonna
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Desktop
          </label>
          <input
            value={layout.grid_col.large}
            type="number"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tablet
          </label>
          <input
            value={layout.grid_col.medium}
            type="number"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Mobile
          </label>
          <input
            value={layout.grid_col.small}
            type="number"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default WidgetFilters;
