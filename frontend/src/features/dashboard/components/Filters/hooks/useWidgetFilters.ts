// Redux
import { useDispatch, useSelector } from "react-redux";
import { setGlobalAlert } from "../../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../../types/store/app";
import {
  changeWidgetVisibility,
  setWidgetLayout,
  type VisualMode,
} from "../../../../../store/filterSlice";
// Filters
import type { IFilters } from "../../../../../types/common/filters";

export const useWidgetFilters = () => {
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const layout = useSelector(
    (state: any) => state.filters.widgetLayout.layoutMode
  );
  const colsLayout = useSelector((state: any) => state.filters.widgetLayout);
  const dispatch = useDispatch();

  const handleChangeVisibility = (
    widget: keyof IFilters["widgetVisibility"],
    visibility: boolean
  ) => {
    dispatch(
      changeWidgetVisibility({ widget: widget, visibility: visibility })
    );
    dispatch(
      setGlobalAlert({
        status: IGlobalAlertStatus.SUCCESS,
        message: "Success",
        description: `The ${widget} widget is now ${
          visibility ? "visible" : "hidden"
        }`,
      })
    );
  };

  const getModeText = (visualMode: VisualMode) => {
    let text = "";
    switch (visualMode) {
      case "large":
        text = "Desktop";
        break;
      case "medium":
        text = "Tablet";
        break;
      case "small":
        text = "Mobile";
        break;
    }
    return text;
  };

  const handleChangeLayout = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setWidgetLayout({
        type: e.currentTarget.name as VisualMode,
        value: Number(e.currentTarget.value),
      })
    );
    dispatch(
      setGlobalAlert({
        status: IGlobalAlertStatus.SUCCESS,
        message: "Success",
        description: `You changed the number of columns for ${getModeText(
          e.currentTarget.name as VisualMode
        )} mode to ${e.currentTarget.value}.`,
      })
    );
  };

  return {
    filters,
    colsLayout,
    layout,
    handleChangeLayout,
    handleChangeVisibility,
  };
};
