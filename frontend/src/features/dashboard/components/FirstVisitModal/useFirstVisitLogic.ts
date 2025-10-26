import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setUserInfo,
  setFirstVisit,
} from "../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../types/store/app";
import {
  validateAvatarColor,
  validateUsername,
} from "../../../../utils/validators";
import { useGlobalAlert } from "../../../../hooks/useAlert";

const useFirstVisitLogic = () => {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [userInfo, setUser] = useState({ username: "", avatar_color: "" });
  const dispatch = useDispatch();
  const { handleAlert } = useGlobalAlert();

  const handleGuestVisit = useCallback(() => {
    dispatch(setUserInfo({ username: "Guest", avatar_color: "red" }));
    dispatch(setFirstVisit(true) as any);
  }, [dispatch]);

  const userInfoValidator = () => {
    if (
      !validateAvatarColor(userInfo.avatar_color) ||
      !validateUsername(userInfo.username, 4)
    ) {
      handleAlert(
        IGlobalAlertStatus.ERROR,
        "Error",
        `Please compile all fields`
      );
      return false;
    } else {
      return true;
    }
  };

  const savePreferences = useCallback(() => {
    if (!userInfoValidator()) {
      return;
    }
    setIsWriting(true);
    dispatch(setUserInfo(userInfo));
    setTimeout(() => {
      setIsWriting(false);
      dispatch(setFirstVisit(true) as any);
      handleAlert(
        IGlobalAlertStatus.SUCCESS,
        "Success",
        `User preferences saved`
      );
    }, 1000);
  }, [dispatch, userInfo]);

  return { userInfo, setUser, handleGuestVisit, savePreferences, isWriting };
};

export { useFirstVisitLogic };
