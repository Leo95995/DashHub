import { storage } from "./storage";

const USER_KEY = "user";

interface IUserPreferences {
  userData: { username: string };
}

/**
 * User Storage details
 */
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

    storage.setItem(`${USER_KEY}_preferences`, userdata.userData);
  },
};

export default userInfo;
