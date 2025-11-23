import { ITestable } from "../../../../types/common/generic";
import type { WidgetTypes } from "../../types";


export interface WidgetSwitcher extends ITestable{
  changeSelectedWidget: (newWidget: WidgetTypes) => void;
  widgetSelected: WidgetTypes;
  widgetList : WidgetTypes[];
  switcherTitle?: string;
  switcherButtonText?: string;

}
