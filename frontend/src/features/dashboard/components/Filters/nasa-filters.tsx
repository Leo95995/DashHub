import { useSelector } from "react-redux";
import GenericSelect from "../../../../components/Select/Select";
import { setSelectedWidget } from "../../../../store/nasaSlice";

import { nasa_widgets } from "../Switcher/datas";
import FilterSection from "./filters-section";
import type { IFilters } from "./types";
import { useWidgetSelector } from "../../hooks/UseWidgetSelector";
import { WidgetOrigin } from "../../hooks/types";

const NasaFilters: React.FC<IFilters> = ({ expanded }) => {
  const nasa_widget = useSelector((state: any) => state.nasa.widgetSelected);

  const { currentSelection, setWidgetSelection } = useWidgetSelector({
    selector: () => nasa_widget,
    actionCreator: setSelectedWidget,
    origin: WidgetOrigin.NASA
  });

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
          testId="nasa"
          itemList={nasa_widgets}
          selectedList={currentSelection}
          onSelection={(e) => setWidgetSelection(e)}
          defaultText={currentSelection}
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
        testId="nasa"
        defaultOpen={false}
        expanded={expanded as boolean}
      >
        {renderNasaContent()}
      </FilterSection>
    </>
  );
};

export default NasaFilters;
