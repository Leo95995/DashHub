export type IGlobalAlertStatus = "error" | "success" | "warn" | "";

export interface IGlobalAlert {
  status: IGlobalAlertStatus
  message: string
  description: string
}



/**
 * Filters Slice Interfaces
 */

export interface IFilters {
  weatherFilters: {
    expanded: boolean;
  };
  cryptoFilters: {
    expanded: boolean;
  };
  socialFilters: {
    expanded: boolean;
  };
  kpiFilters: {
    expanded: boolean;
  };
  widgetVisibility: {
    weather: boolean;
    kpi: boolean;
    social: boolean;
    crypto: boolean;
  };
}