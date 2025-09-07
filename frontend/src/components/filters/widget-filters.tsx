// Filters for weathers

import type React from "react";
import { useDispatch } from "react-redux";
import { setTemperatureType } from "../../store/weatherSlice";
import CheckboxGroup from "../checkbox/checkboxGroup";
import { changeWidgetVisibility } from "../../store/filterSlice";
import type { IFilters } from "../../store/interfaces/interfaces";

interface IWidgetFilters {
  expanded: boolean;
}

const WidgetFilters: React.FC<IWidgetFilters> = ({ expanded }) => {
  const dispatch = useDispatch();

  const changeVisibility = (widget: keyof IFilters["widgetVisibility"], visibility: boolean) => {
    dispatch(
      changeWidgetVisibility({ widget: widget, visibility: visibility })
    );
  };

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
          <CheckboxGroup options={[{ label: "fix", value: "test" }]} onChange={changeVisibility}/>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-48 py-4">
        <label
          htmlFor="temperature"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Seleziona formato
        </label>
        <select
          onChange={(e) =>
            dispatch(setTemperatureType(e.currentTarget.value.toLowerCase()))
          }
          name="temperature"
          id="temperature"
          className="
      border border-gray-300 dark:border-gray-600
      rounded-lg
      px-3 py-2
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600
      transition-colors duration-200
      cursor-pointer
    "
        >
          <option>Celsius</option>
          <option>Kelvin</option>
        </select>
      </div>
    </div>
  );
};

export default WidgetFilters;
