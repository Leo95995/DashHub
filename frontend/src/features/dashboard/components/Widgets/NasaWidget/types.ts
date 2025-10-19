//  Types
import type { ItemStatus } from "../../../../../types/common/status";
import type { CMEData, INasaApodData, INeoWsData } from "../../../../../types/store/nasa";
import type { NasaWidgets } from "../../../types";

export interface IApodWidget {
  data: INasaApodData;
  loading: boolean;
  error: string | null;
}


export interface IWidgetContainer {
  apodStatus: IApodWidget;
  neoWStatus: ItemStatus<INeoWsData[]>;
  cmeStatus: ItemStatus<CMEData>;
  widgetSelected: NasaWidgets;
}
