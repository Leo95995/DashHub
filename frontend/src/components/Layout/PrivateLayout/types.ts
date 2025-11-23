import { ITestable } from "../../../types/common/generic";

export interface IHeader extends ITestable {
  screenWidth: number;
}

export interface IMainContent extends ITestable {
    children: React.ReactNode
}
