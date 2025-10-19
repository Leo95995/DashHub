import type { IFilters } from "../../types/common/filters";

export interface CheckboxOption {
  label: string;
  value: string;
}
export interface ICheckbox {
  option: CheckboxOption;
  selectedList: any
  onChange?: (
    widget: keyof IFilters["widgetVisibility"],
    visibility: boolean
  ) => void;

}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  onChange?: (
    widget: keyof IFilters["widgetVisibility"],
    visibility: boolean
  ) => void;
  selectedList: any

}
