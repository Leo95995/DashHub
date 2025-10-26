// Interfaces
import type { GithubContainer } from "../../../../../../types/store/github";


import { useRenderSubwidget } from "./userRenderSubwidget";

const GithubWidgetContainer: React.FC<GithubContainer> = ({ widget }) => {
 
  const {currentWidget} = useRenderSubwidget({widget})

  return <>{currentWidget}</>;
};

export default GithubWidgetContainer;
