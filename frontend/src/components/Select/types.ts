import { ITestable } from "../../types/common/generic";

export interface IGenericSelect<T>  extends ITestable{
  itemList: Array<T> | T;
  selectedList: Array<T>;
  onSelection: (value: any) => void;
  defaultText: string;
  placement?: 'start' | 'end' | 'center'
  padding?: string
  minHeigth?: string
  listPlacement?: string
  closePlacement?: string
}
