export interface IUserData {
  userInfo: any;
  preferences: any;
}

export interface IDashBoardHeader {
  userData: IUserData;
  isEditMode: boolean;
  onClick: (val: boolean) => void;
  widgetOrder: number[];
  screenWidth: number;
  visibleWidgets: number;
}
