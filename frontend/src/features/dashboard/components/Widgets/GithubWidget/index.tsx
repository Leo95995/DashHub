import type React from "react";
import { useState } from "react";
import GithubWidgetContainer from "./SubWidgets/github-widgets-container";
// import Switcher from "../NasaWidget/WidgetSwitcher/switcher";
import type { GithubWidgets } from "../../widgetSwitcher/types";





const GithubWidget: React.FC = () => {
  const [githubWidget , setGithubWidget] = useState<GithubWidgets>('repos');



  // const changeSelectedWidget = (newWidget: GithubWidgets) => {
  //   dispatch(setSelectedWidget(newWidget));
  // };



  return (
    <>
      <div className="col-span-1 rounded-lg p-6 shadow-lg ">
        {/* <Switcher changeSelectedWidget={githubWidget}/> */}
        <GithubWidgetContainer widget="repos"/>
      </div>
    </>
  );
};

export default GithubWidget;
