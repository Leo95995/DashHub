import { ITestable } from "../../../../types/common/generic";

export interface IFilterSection extends ITestable {
  title: string;
  defaultOpen: boolean;
  children: React.ReactNode;
  expanded: boolean;
}

export interface IFilters {
  expanded?: boolean;
  isMobile?:boolean
}


