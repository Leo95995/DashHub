import GenericSelect from "../select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { GithubWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import { github_widgets } from "../../features/dashboard/components/widgetSwitcher/datas";
import { setSelectedGithubWidget } from "../../store/githubSlice";
import FilterSection from "./filters-section";

interface IGithubFilters {
  expanded: boolean;
}

const GithubFilters: React.FC<IGithubFilters> = ({ expanded }) => {
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
        title={"Github Filters"}
        defaultOpen={false}
        expanded={expanded}
      >
        {renderGithubSelector()}
      </FilterSection>
    </>
  );
};

export default GithubFilters;
