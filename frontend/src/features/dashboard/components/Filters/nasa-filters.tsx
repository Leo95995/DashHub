import { useDispatch, useSelector } from "react-redux";
import GenericSelect from "../../../../components/Select/Select";
import { setSelectedWidget } from "../../../../store/nasaSlice";
import type { NasaWidgets } from "../../types";
import { nasa_widgets } from "../Switcher/datas";
import FilterSection from "./filters-section";
import type { IFilters } from "./types";



const NasaFilters: React.FC<IFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state: any) => state.nasa.widgetSelected);

  const setSelectedNasaWidget = (widget: NasaWidgets) => {
    if (widget) {
      dispatch(setSelectedWidget(widget));
    }
  };

  const renderNasaContent = () => {
    return (
      <div className="flex flex-col gap-2 w-full ">
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
        title={"NASA"}
        defaultOpen={false}
        expanded={expanded as boolean}
      >
        {renderNasaContent()}
      </FilterSection>
    </>
  );
};

export default NasaFilters;
