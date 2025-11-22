import { ITestable } from "../../../../types/common/generic";

export interface IUserData {
  userInfo: any;
  preferences: any;
}

export interface IDashBoardHeader extends ITestable{
  userData: IUserData;
  isEditMode: boolean;
  onClick: (val: boolean) => void;
  widgetOrder: number[];
  screenWidth: number;
  visibleWidgets: number;
}
