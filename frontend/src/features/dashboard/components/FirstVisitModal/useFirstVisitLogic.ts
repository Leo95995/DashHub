import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, setFirstVisit, setGlobalAlert } from "../../../../store/appSlice";
import { IGlobalAlertStatus } from "../../../../types/store/app";

const useFirstVisitLogic = () => {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [userInfo, setUser] = useState({ username: "", avatar_color: "" });
  const dispatch = useDispatch();

  const handleGuestVisit = useCallback(() => {
    dispatch(setUserInfo({ username: "Guest", avatar_color: "red" }));
    dispatch(setFirstVisit(true) as any);
  }, [dispatch]);

  const userInfoValidator = () => {
    if (!userInfo.avatar_color.length || !userInfo.username.length) {
      return false;
    } else {
      return true;
    }
  };

  const savePreferences = useCallback(() => {
    const isValidUser = userInfoValidator();
    if (!isValidUser) {
      dispatch(
        setGlobalAlert({
          status: IGlobalAlertStatus.ERROR,
          message: "Error",
          description: `Please compile all fields`,
        })
      );

      return;
    }

    setIsWriting(true);
    dispatch(setUserInfo(userInfo));
    setTimeout(() => {
      setIsWriting(false);
      dispatch(setFirstVisit(true) as any);
        dispatch(
        setGlobalAlert({
          status: IGlobalAlertStatus.SUCCESS,
          message: "Success",
          description: `Data saved with success`,
        })
      );
    }, 1000);
  }, [dispatch, userInfo]);

  return { userInfo, setUser, handleGuestVisit, savePreferences, isWriting };
};

export { useFirstVisitLogic };
