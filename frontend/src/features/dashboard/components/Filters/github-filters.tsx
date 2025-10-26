// Redux and slice
import {  useSelector } from "react-redux";
import { setSelectedGithubWidget } from "../../../../store/githubSlice";
// Types 

import type { IFilters } from "./types";
// Components
import GenericSelect from "../../../../components/Select/Select";
import FilterSection from "./filters-section";
// Data
import { github_widgets } from "../Switcher/datas";
import { useWidgetSelector } from "../../hooks/UseWidgetSelector";
import { WidgetOrigin } from "../../hooks/types";

const GithubFilters: React.FC<IFilters> = ({ expanded }) => {
  const github_widget = useSelector(
    (state: any) => state.github.selectedWidget
  );
  
  const { currentSelection, setWidgetSelection } = useWidgetSelector({
    selector: () => github_widget,
    actionCreator: setSelectedGithubWidget,
    origin: WidgetOrigin.GITHUB
  });

  const renderGithubSelector = () => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="temperature"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Select Github Widget
        </label>
        <GenericSelect
          itemList={github_widgets}
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
        title={"GITHUB"}
        defaultOpen={false}
        expanded={expanded as boolean}
      >
        {renderGithubSelector()}
      </FilterSection>
    </>
  );
};

export default GithubFilters;
