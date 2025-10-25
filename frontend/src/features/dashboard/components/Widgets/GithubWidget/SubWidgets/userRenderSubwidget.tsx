//  Widgets
import UserActivityWidget from "./UserActivityWidget";
import RandomUserWidget from "./RandomUserWidget";
import type { GithubWidgets } from "../../../../types";
import PopularReposWidget from "./PopularReposWidget";
import { useEffect, useState, type JSX } from "react";

export const useRenderSubwidget = ({ widget }: { widget: GithubWidgets }) => {
  const [currentWidget, setcurrentWidget] = useState<JSX.Element>();
  useEffect(() => {
    const res = renderSelectedWidget(widget);
    setcurrentWidget(res);
  }, [widget]);

  const renderSelectedWidget = (widget: GithubWidgets) => {

    switch(widget){
      case "Trending Repositories":
        return <PopularReposWidget />
      case "Random User":
        return <RandomUserWidget />
      default:
        return  <UserActivityWidget />
    }
     
  };

  return { currentWidget };
};
