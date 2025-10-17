import GenericSelect from "../select";
import { useSelector, useDispatch } from "react-redux";
import { nasa_widgets } from "../../features/dashboard/components/widgetSwitcher/datas";
import type { NasaWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import { setSelectedWidget } from "../../store/nasaSlice";
import FilterSection from "./filters-section";

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

  const renderNasaContent = () => {
    return (
      <div className="flex flex-col gap-2 w-full px-4 ">
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
    );
  };

  return (
    <>
      <FilterSection
        title={"Nasa Widget"}
        defaultOpen={false}
        expanded={expanded}
      >
        {renderNasaContent()}
      </FilterSection>
    </>
  );
};

export default NasaFilters;
