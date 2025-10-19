import type { WidgetTypes } from "../../types";


export interface WidgetSwitcher {
  changeSelectedWidget: (newWidget: WidgetTypes) => void;
  widgetSelected: WidgetTypes;
  widgetList : WidgetTypes[];
  switcherTitle?: string;
  switcherButtonText?: string;

}
