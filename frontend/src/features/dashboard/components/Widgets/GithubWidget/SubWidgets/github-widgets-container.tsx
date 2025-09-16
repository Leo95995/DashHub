import type { GithubContainer } from "../../../../../../store/interfaces/interfaces";
import PopularReposWidget from "./PopularReposWidget";
import UserActivityWidget from "./UserActivityWidget";



const GithubWidgetContainer: React.FC<GithubContainer> = ({ widget }) => {
  // Show the selected widget
  const renderSelectedWidget = () => {
    return widget == "repos" ? <PopularReposWidget /> : <UserActivityWidget />;
  };

  return <>{renderSelectedWidget()}</>;
};

export default GithubWidgetContainer;
