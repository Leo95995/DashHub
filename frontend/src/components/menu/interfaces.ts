export interface IMenuOption {
  text: string;
  action: (val?: any) => void;
  shortcut?: string;
  icon?: React.ReactNode
}

export interface IGenericMenu {
  menuOptions: IMenuOption[];
}
