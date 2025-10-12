// Filters for weathers
import type React from "react";
import { useDispatch } from "react-redux";
import CheckboxGroup from "../checkbox/checkboxGroup";
import {
  changeWidgetVisibility,
  type VisualMode,
} from "../../store/filterSlice";
import type { IFilters } from "../../store/interfaces/interfaces";
import { filterUtils } from "../../utils/filter-utils";
import { useSelector } from "react-redux";
import { setWidgetLayout } from "../../store/filterSlice";
import type { ScreenMode } from "../../interfaces/common/interfaces";
import { CircleCheck } from "lucide-react";

interface IWidgetFilters {
  expanded: boolean;
}

const WidgetFilters: React.FC<IWidgetFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const layout = useSelector(
    (state: any) => state.filters.widgetLayout.layoutMode
  );
  const colsLayout = useSelector((state: any) => state.filters.widgetLayout);

  const changeVisibility = (
    widget: keyof IFilters["widgetVisibility"],
    visibility: boolean
  ) => {
    dispatch(
      changeWidgetVisibility({ widget: widget, visibility: visibility })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setWidgetLayout({
        type: e.currentTarget.name as VisualMode,
        value: Number(e.currentTarget.value),
      })
    );
  };



  const optionlist = filterUtils(filters);

  const CurrentLayout: React.FC<{ target: ScreenMode }> = ({ target }) => {
    if (layout !== target) return null;

    return (
      <span
        className="
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm gap-1
      "
      >
        <CircleCheck size={16} /> Current
      </span>
    );
  };

  return (
    <div
      className={`h-full transform transition-all duration-300 overflow-hidden 
    ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      <h2 className="text-md font-semibold mb-4 text-gray-700 dark:text-blue-300">
        Widget Settings
      </h2>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="location"
          className="text-md font-semibold text-gray-700 dark:text-gray-200 py-1"
        >
          Visible widgets
        </label>
        <div className="flex">
          <CheckboxGroup
            selectedList={filters}
            options={optionlist}
            onChange={changeVisibility}
          />
        </div>
      </div>
      <p className="text-md pt-2 font-semibold text-gray-800 dark:text-gray-100">
        Layout Widget
      </p>
      <div className="flex flex-col gap-4 w-60 p-4 my-2 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="mb-2">
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Number Of Columns
          </p>
          <div className="flex flex-col gap-2 w-48 py-4">
            <label
              htmlFor="large"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Desktop <CurrentLayout target={"desktop"} />
            </label>
          { colsLayout.grid_col.large != null &&   <select
              value={colsLayout.grid_col.large}
              onChange={(e) => handleChange(e)}
              name="large"
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
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={1}>1</option>
            </select>}
            <label
              htmlFor="medium"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Tablet <CurrentLayout target={"tablet"} />
            </label>
           {colsLayout.grid_col.medium != null && <select
              value={colsLayout.grid_col.medium}
              onChange={(e) => handleChange(e)}
              name="medium"
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
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>}
            <label
              htmlFor="small"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Mobile <CurrentLayout target={"mobile"} />
            </label>
          {colsLayout.grid_col.small != null &&  <select
              onChange={(e) => handleChange(e)}
              value={colsLayout.grid_col.small}
              name="small"
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
              <option>1</option>
            </select>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetFilters;
