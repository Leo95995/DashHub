import type React from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
//  Components
import GithubWidgetContainer from "./SubWidgets/github-widgets-container";
import { github_widgets } from "../../Switcher/datas";
import Switcher from "../../Switcher/switcher";
import Tag from "../../../../../components/Tag/Tag";
//  Types
import type { IGenericWidget } from "../../../types";
//  Hooks and Slices
import { setSelectedGithubWidget } from "../../../../../store/githubSlice";
import { setGlobalAlert } from "../../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../../types/store/app";
// Custmom hooks
import { useDragDrop } from "../../../../../hooks/useDragAndDrop";
import { useWidgetSelector } from "../../../hooks/UseWidgetSelector";
import { WidgetOrigin } from "../../../hooks/types";

const GithubWidget: React.FC<IGenericWidget> = ({
  isEditMode,
  widgetId,
  handleDrop,
  setDraggedWidgetId,
  testId
}) => {
  const dispatch = useDispatch();
  const githubWidget = useSelector((state: any) => state.github.selectedWidget);

  // Widget selection
  const { currentSelection, setWidgetSelection } = useWidgetSelector({
    selector: () => githubWidget,
    actionCreator:setSelectedGithubWidget ,
    origin: WidgetOrigin.GITHUB
  });

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
        data-testid={testId}
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
            widgetSelected={currentSelection}
            switcherTitle="Select the Github widget"
            switcherButtonText="Change Widget"
            changeSelectedWidget={(e) => {
              setWidgetSelection(e)
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
        <GithubWidgetContainer widget={currentSelection} />
      </div>
    </>
  );
};

export default GithubWidget;
