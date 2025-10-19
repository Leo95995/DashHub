import { IGlobalAlertStatus } from "../../types/store/app";
import userInfo from "../../services/storage/user";
import type { ISideBar } from "../../types/store/app";

const initialSideBar: ISideBar = {
  expanded: true,
};

const firstVisit = userInfo.getFirstVisit();

const userInfoValue = userInfo.getUserPreferences() ?? {};

export const initialState = {
  internalLoad: false,
  sideBar: initialSideBar,
  globalLoad: false,
  userData: { userInfo: userInfoValue, firstVisit: firstVisit ?? null },
  isEditMode: false,
  globalAlert: {
    status: "" as IGlobalAlertStatus,
    message: "",
    description: "",
  }
};
