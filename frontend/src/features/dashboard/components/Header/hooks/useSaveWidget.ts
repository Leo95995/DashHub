import { useDispatch } from "react-redux";
import DashboardStorage from "../../../../../services/storage/dashboard";
import { setGlobalAlert } from "../../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../../types/store/app";

interface IUseSaveWidget {
  widgetOrder: number[];
  onClick: (status: boolean) => void;
  isEditMode: boolean;
}

export const useSaveWidget = ({
  onClick,
  isEditMode,
  widgetOrder,
}: IUseSaveWidget) => {
  const dispatch = useDispatch();

  const saveWidget = (): void => {
    onClick(isEditMode);
    DashboardStorage.widgets.saveWidgetOrder(widgetOrder);
    dispatch(
      setGlobalAlert({
        status: IGlobalAlertStatus.SUCCESS,
        message: "Success",
        description: "New widget order saved with success!!",
      })
    );
  };

  return { saveWidgetOrder: saveWidget };
};
