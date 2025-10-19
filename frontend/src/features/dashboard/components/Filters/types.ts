
export interface IFilterSection {
  title: string;
  defaultOpen: boolean;
  children: React.ReactNode;
  expanded: boolean;
}


export interface IFilters {
  expanded?: boolean;
  isMobile?:boolean
}
