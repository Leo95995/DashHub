
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux"; // Usa type Dispatch
import { setLayoutMode } from "../../../store/filterSlice";
import { setEditMode, setGlobalAlert } from "../../../store/appSlice";
import useScreenWidthHook from "../../../hooks/useScreenWidthHook";
import { IGlobalAlertStatus } from "../../../types/store/app";


export const useDashboardLogic = () => {
  const dispatch = useDispatch();
  
  const filters = useSelector(
    (state: any) => state.filters.filters.widgetVisibility
  );
  const layout = useSelector((state: any) => state.filters.widgetLayout);
  const appData = useSelector((state: any) => state.app);
  const { isEditMode, userData } = appData;


  const { getLayoutByMode, currentMode, screenWidth } =
    useScreenWidthHook(layout);

  useEffect(() => {
    dispatch(setLayoutMode(currentMode));
  }, [currentMode, dispatch]);

  
  const toggleEditMode = useCallback(
    (status: boolean) => {
      dispatch(
        setGlobalAlert({
          status: IGlobalAlertStatus.SUCCESS,
          message: "Success",
          description: status ? `Drag and Drop mode is now OFF` : `Drag and Drop mode is now ON`,
        })
      );
      dispatch(setEditMode(!status));
    },
    [dispatch]
  );

  return {
    filters,
    isEditMode,
    userData,
    getLayoutByMode,
    screenWidth,
    toggleEditMode,
  };
};