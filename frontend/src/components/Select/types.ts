export interface IGenericSelect<T> {
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
