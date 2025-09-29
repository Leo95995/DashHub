import GenericSelect from "../select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { nasa_widgets } from "../../features/dashboard/components/widgetSwitcher/datas";
import type { NasaWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import { setSelectedWidget } from "../../store/nasaSlice";

interface INasaFilters {
  expanded: boolean;
}

const NasaFilters: React.FC<INasaFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state: any) => state.nasa.widgetSelected);


  const setSelectedNasaWidget = (widget: NasaWidgets) => {
    if (widget) {
      dispatch(setSelectedWidget(widget));
    }
  };

  return (
    <>
      <div
        className={`h-full transform transition-all duration-300 z-200  w-68
        ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        <span className="text-xl font-semibold mb-4 text-gray-900 dark:text-blue-200">
          Nasa Filters
        </span>

        <div className="flex flex-col  gap-2 w-full py-4">
          <label
            htmlFor="temperature"
            className="font-semibold text-gray-700 dark:text-gray-200"
          >
            Select Nasa Widget
          </label>
          <GenericSelect
            itemList={nasa_widgets}
            selectedList={currentFilters}
            onSelection={(e) => setSelectedNasaWidget(e)}
            defaultText={currentFilters}
            minHeigth="min-h-14"
            placement="start"
          />
        </div>
        pippo pluto paperino
      </div>
    </>
  );
};

export default NasaFilters;
