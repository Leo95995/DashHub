import { storage } from "./storage";
import type { IUserPreferences } from "./types";

const USER_KEY = "user";

const userInfo = {
  getFirstVisit: () => {
    return storage.getItem(`${USER_KEY}_firstVisit`);
  },
  setFirstVisit: (firstVisit: boolean | null) => {
    storage.setItem(`${USER_KEY}_firstVisit`, firstVisit);
  },
  getUserPreferences: () => {
    return storage.getItem(`${USER_KEY}_preferences`);
  },
  setUserPreferences: (userdata: IUserPreferences) => {
    storage.setItem(`${USER_KEY}_preferences`, userdata);
  },
};

export default userInfo;
