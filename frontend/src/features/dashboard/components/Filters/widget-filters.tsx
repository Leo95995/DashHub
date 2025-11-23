import { CircleCheck } from "lucide-react";
import type { ScreenMode } from "../../../../types/common/generic";
import { filterUtils } from "../../../../utils/filter-utils";
import FilterSection from "./filters-section";
import { useWidgetFilters } from "./hooks/useWidgetFilters";
import CheckboxGroup from "../../../../components/Checkbox/CheckboxGroup";
import type { IFilters } from "./types";


const WidgetFilters: React.FC<IFilters> = ({ expanded }) => {
  const {
    filters,
    colsLayout,
    layout,
    handleChangeLayout,
    handleChangeVisibility,
  } = useWidgetFilters();

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

  const renderVisibleWidgets = () => {
    return (
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
            onChange={handleChangeVisibility}
          />
        </div>
      </div>
    );
  };

  const renderLayoutWidget = () => {
    return (
      <div className="py-2">
        <p className="text-md pt-2 font-semibold text-gray-700 dark:text-gray-100">
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
                className="font-semibold  text-gray-700 dark:text-gray-200"
              >
                Desktop <CurrentLayout target={"desktop"} />
              </label>
              {colsLayout.grid_col.large != null && (
                <select
                  value={colsLayout.grid_col.large}
                  onChange={(e) => handleChangeLayout(e)}
                  name="large"
                  aria-label="Desktop columns selector"
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
                </select>
              )}
              <label
                htmlFor="medium"
                className="font-semibold text-gray-700 dark:text-gray-200"
              >
                Tablet <CurrentLayout target={"tablet"} />
              </label>
              {colsLayout.grid_col.medium != null && (
                <select
                  value={colsLayout.grid_col.medium}
                  onChange={(e) => handleChangeLayout(e)}
                  name="medium"
                  aria-label="Tablet columns selector"
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
                </select>
              )}
              <label
                htmlFor="small"
                className="font-semibold text-gray-700 dark:text-gray-200"
              >
                Mobile <CurrentLayout target={"mobile"} />
              </label>
              {colsLayout.grid_col.small != null && (
                <select
                  onChange={(e) => handleChangeLayout(e)}
                  value={colsLayout.grid_col.small}
                  name="small"
                  aria-label="Mobile columns selector"
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
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <FilterSection expanded={expanded as boolean} testId="widget" title="WIDGETS " defaultOpen={true}>
      {renderVisibleWidgets()}
      {renderLayoutWidget()}
    </FilterSection>
  );
};

export default WidgetFilters;
