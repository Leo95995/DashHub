// React
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
// Redux
import type { WidgetSelectorParams } from "./types";
import { useGlobalAlert } from "../../../hooks/useAlert";
import { IGlobalAlertStatus } from "../../../types/store/app";
/**
 * Shared between filters and widgets for selection
 */
export const useWidgetSelector = ({
  selector,
  actionCreator,
  origin,
}: WidgetSelectorParams) => {
  const dispatch = useDispatch();
  const currentSelection = useSelector(selector);

  const { handleAlert } = useGlobalAlert();

  const setWidgetSelection = useCallback(
    (widget: any) => {
      if (widget) {
        dispatch(actionCreator(widget) as any);
        handleAlert(
          IGlobalAlertStatus.SUCCESS,
          "Success",
          `the new subwidget selected for the ${origin} widget is ${widget}`
        );
      }
    },
    [dispatch, actionCreator]
  );

  return { currentSelection, setWidgetSelection };
};
