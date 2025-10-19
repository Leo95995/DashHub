import type React from "react";
import GithubWidgetContainer from "./SubWidgets/github-widgets-container";
import { github_widgets } from "../../Switcher/datas";
import Switcher from "../../Switcher/switcher";
import type { GithubWidgets, IGenericWidget } from "../../../types";
import Tag from "../../../../../components/Tag/Tag";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGithubWidget } from "../../../../../store/githubSlice";
import { setGlobalAlert } from "../../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../../types/store/app";
import { useDragDrop } from "../../../../../hooks/useDragAndDrop";

const GithubWidget: React.FC<IGenericWidget> = ({
  isEditMode,
  widgetId,
  handleDrop,
  setDraggedWidgetId,
}) => {
  const githubWidget = useSelector((state: any) => state.github.selectedWidget);
  const dispatch = useDispatch();

    const {
      dragging,
      dragStartHandler,
      dragEndHandler,
      dragOverHandler,
      dropHandler,
    } = useDragDrop({ widgetId, handleDrop, setDraggedWidgetId });

  return (
    <>
      <div
        draggable={isEditMode}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
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
            switcherTitle="Select the Github widget"
            switcherButtonText="Change Widget"
            changeSelectedWidget={(e) => {
              dispatch(setSelectedGithubWidget(e as GithubWidgets));
              dispatch(
                setGlobalAlert({
                  status: IGlobalAlertStatus.SUCCESS,
                  message: "Success",
                  description: `You have selected the "${e}" widget for GitHub.`,
                })
              );
            }}
            widgetList={github_widgets}
          />
          {isEditMode && <Tag text="Edit Mode"></Tag>}
        </div>
        <GithubWidgetContainer widget={githubWidget} />
      </div>
    </>
  );
};

export default GithubWidget;
