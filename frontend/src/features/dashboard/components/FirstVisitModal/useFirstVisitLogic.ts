import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, setFirstVisit } from "../../../../store/appSlice";

const useFirstVisitLogic = () => {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [userInfo, setUser] = useState({ username: "", avatar_color: "" });
  const dispatch = useDispatch();

  const handleGuestVisit = useCallback(() => {
    dispatch(setUserInfo({ username: "Guest", avatar_color: "red" }));
    dispatch(setFirstVisit(true) as any);
  }, [dispatch]);

  const savePreferences = useCallback(() => {
    setIsWriting(true);
    dispatch(setUserInfo(userInfo));
    setTimeout(() => {
      setIsWriting(false);
      dispatch(setFirstVisit(true) as any);
    }, 1000);
  }, [dispatch, userInfo]);

  return { userInfo, setUser, handleGuestVisit, savePreferences, isWriting };
};

export { useFirstVisitLogic };
