import { useDispatch, useSelector } from "react-redux";
import GenericSelect from "../../../../components/Select/Select";
import { setSelectedGithubWidget } from "../../../../store/githubSlice";
import type { GithubWidgets } from "../../types";
import { github_widgets } from "../Switcher/datas";
import FilterSection from "./filters-section";
import type { IFilters } from "./types";



const GithubFilters: React.FC<IFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector(
    (state: any) => state.github.selectedWidget
  );

  const setGithubWidget = (widget: GithubWidgets) => {
    if (widget) {
      dispatch(setSelectedGithubWidget(widget) as any);
    }
  };

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
          selectedList={currentFilters}
          onSelection={(e) => setGithubWidget(e)}
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
