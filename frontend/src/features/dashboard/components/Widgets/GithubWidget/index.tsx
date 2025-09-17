import type React from "react";
import { useState } from "react";
import GithubWidgetContainer from "./SubWidgets/github-widgets-container";
// import Switcher from "../NasaWidget/WidgetSwitcher/switcher";
import type { GithubWidgets } from "../../widgetSwitcher/types";
import { github_widgets } from "../../widgetSwitcher/datas";
import Switcher from "../../widgetSwitcher/switcher";

const GithubWidget: React.FC = () => {
  const [githubWidget, setGithubWidget] = useState<GithubWidgets>("repos");

  return (
    <>
      <div className="col-span-1 rounded-lg p-6 shadow-lg ">
        <Switcher
          changeSelectedWidget={(e) => setGithubWidget(e as GithubWidgets)}
          widgetList={github_widgets}
        />

        <GithubWidgetContainer widget={githubWidget} />
      </div>
    </>
  );
};

export default GithubWidget;
