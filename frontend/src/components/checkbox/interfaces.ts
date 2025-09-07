import type { IFilters } from "../../store/interfaces/interfaces";

export interface CheckboxOption {
  label: string;
  value: string;
}
export interface ICheckbox {
  option: CheckboxOption;
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
}
