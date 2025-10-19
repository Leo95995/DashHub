// App Slice
export interface ISideBar {
  expanded: boolean;
}

export enum IGlobalAlertStatus {
  ERROR = "error",
  SUCCESS = "success",
  WARN = "warn",
  NO_STATUS = "",
}

export interface IUserPreferences {
  username: string;
  avatar_color: string;
}

export interface IUserData {
  userInfo: IUserPreferences;
  firstVisit: boolean;
}


export interface IGlobalAlert {
  status: IGlobalAlertStatus; 
  message: string;
  description: string;
}


export interface AppState {
  isEditMode: boolean;
  userData: IUserData;
  globalAlert: IGlobalAlert;
  sideBar: ISideBar;
  globalLoad: boolean;
}
