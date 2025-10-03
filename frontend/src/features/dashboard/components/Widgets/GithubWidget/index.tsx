import type React from "react";
import { useState } from "react";
import GithubWidgetContainer from "./SubWidgets/github-widgets-container";
// import Switcher from "../NasaWidget/WidgetSwitcher/switcher";
import type { GithubWidgets } from "../../widgetSwitcher/types";
import { github_widgets } from "../../widgetSwitcher/datas";
import Switcher from "../../widgetSwitcher/switcher";
import type { IGenericWidget } from "../../../interfaces";
import Tag from "../../../../../components/Tag";

const GithubWidget: React.FC<IGenericWidget> = ({
  isEditMode,
  widgetId,
  onHide,
  setWidgetOrder,
  handleDrop,
  setDraggedWidgetId,
}) => {
  const [githubWidget, setGithubWidget] = useState<GithubWidgets>("repos");
  const [dragging, setDragging] = useState<boolean>(false);

  return (
    <>
      <div
        draggable={isEditMode}
        onDragStart={() => {
          setDragging(true);
          setDraggedWidgetId(widgetId);
        }}
        onDragEnd={() => {
          setDragging(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(widgetId)}
        className={`col-span-1  relative   rounded-lg p-6 items-center flex flex-col shadow-xl border h-120 dark:border-gray-700 border-gray-200
       bg-white text-gray-900 dark:bg-gray-800 dark:text-white  hover:scale-105 duration-300
       ${isEditMode && "ring-2 ring-blue-400 hover:scale-105 cursor-grab"}
       ${
         dragging
           ? "scale-95 shadow-2xl cursor-grabbing ring-4 ring-blue-500"
           : ""
       }`}
      >
        <div className="flex items-center justify-between w-full">
          <Switcher
            widgetSelected={githubWidget}
            switcherButtonText="Change Github Widget"
            changeSelectedWidget={(e) => setGithubWidget(e as GithubWidgets)}
            widgetList={github_widgets}
          />
          {isEditMode ? (
            <Tag text="Edit Mode"></Tag>
          ) : (
            <span>No edit mode</span>
          )}
        </div>
        <GithubWidgetContainer widget={githubWidget} />
      </div>
    </>
  );
};

export default GithubWidget;
