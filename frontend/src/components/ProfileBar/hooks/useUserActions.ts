// Redux
import { useDispatch } from "react-redux";
// Types
import { IGlobalAlertStatus } from "../../../types/store/app";
// App Slice
import {
  setUserName,
  setUserAvatarColor,
} from "../../../store/appSlice";
// Validator for username
import { validateUsername } from "../../../utils/validators";
// React
import { useGlobalAlert } from "../../../hooks/useAlert";

// Hook responsible of dispatching user actions
export const useUserActions = () => {
  const dispatch = useDispatch();
  const { handleAlert } = useGlobalAlert();

  const updateUserAvatar = (color: string) => {
    if(!color.length){
  handleAlert(
        IGlobalAlertStatus.ERROR,
        "Error",
        `No color selected`
      );
      return false
    }
    dispatch(setUserAvatarColor(color));
    return true
  };

  const updateUserName = (username: string) => {
    if (validateUsername(username, 4)) {
      handleAlert(
        IGlobalAlertStatus.SUCCESS,
        "Success",
        `Modified username and avatar with success`
      );
      dispatch(setUserName(username));
      return true;
    }
    handleAlert(
      IGlobalAlertStatus.ERROR,
      "Error",
      `Username too short. it must be longer than 4 characters`
    );
    return false;
  };

  return { updateUserName, updateUserAvatar };
};
