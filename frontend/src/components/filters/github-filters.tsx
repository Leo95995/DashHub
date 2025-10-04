import GenericSelect from "../select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { GithubWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import { github_widgets } from "../../features/dashboard/components/widgetSwitcher/datas";
import { setSelectedGithubWidget } from "../../store/githubSlice";

interface IGithubFilters {
  expanded: boolean;
}

const GithubFilters: React.FC<IGithubFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state: any) => state.github.selectedWidget);


  const setGithubWidget = (widget: GithubWidgets) => {
    console.log(widget);
    if (widget) {
      dispatch(setSelectedGithubWidget(widget)as any);
    }
  };

  return (
    <>
      <div
        className={`h-full transform transition-all duration-300 z-200  w-68
        ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        <span className="text-xl font-semibold mb-4 text-gray-900 dark:text-blue-200">
        Github Filters
        </span>

        <div className="flex flex-col  gap-2 w-full py-4">
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
     
      </div>
    </>
  );
};

export default GithubFilters;
