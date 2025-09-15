import PopularReposWidget from "./PopularReposWidget";
import UserActivityWidget from "./UserActivityWidget";
import type { GithubWidgets } from "..";

interface GithubContainer {
  widget: GithubWidgets;
}

const GithubWidgetContainer: React.FC<GithubContainer> = ({ widget }) => {
  // Show the selected widget
  const renderSelectedWidget = () => {
    return widget == "repos" ? <PopularReposWidget /> : <UserActivityWidget />;
  };

  return <>{renderSelectedWidget()}</>;
};

export default GithubWidgetContainer;
