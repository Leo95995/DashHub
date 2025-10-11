// Interfaces
import type { GithubContainer } from "../../../../../../store/interfaces/interfaces";
//  Widgets
import PopularReposWidget from "./PopularReposWidget";
import UserActivityWidget from "./UserActivityWidget";
import RandomUserWidget from "./RandomUserWidget";

const GithubWidgetContainer: React.FC<GithubContainer> = ({ widget }) => {

  const renderSelectedWidget = () => {
    return widget == "Trending Repositories" ? <PopularReposWidget />  :  widget === 'Random User' ? <><RandomUserWidget/></>  :<UserActivityWidget />;
  };

  return <>
  {renderSelectedWidget()}</>;
};

export default GithubWidgetContainer;
