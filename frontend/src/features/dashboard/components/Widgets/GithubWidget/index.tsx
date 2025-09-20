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
      <div className="col-span-1  relative min-h-100  rounded-lg p-6 items-center flex flex-col shadow-xl border h-110 dark:border-gray-700 border-gray-200 bg-white text-gray-900 dark:bg-gray-800 dark:text-white  hover:scale-105 duration-300 ">
        <div className="pb-3">
          <Switcher
            switcherButtonText="Change Github Widget"
            changeSelectedWidget={(e) => setGithubWidget(e as GithubWidgets)}
            widgetList={github_widgets}
          />
        </div>
        <GithubWidgetContainer widget={githubWidget} />
      </div>
    </>
  );
};

export default GithubWidget;
