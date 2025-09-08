export type IGlobalAlertStatus = "error" | "success" | "warn" | "";

export interface IGlobalAlert {
  status: IGlobalAlertStatus;
  message: string;
  description: string;
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
  nasaFilters: {
    expanded: boolean;
  };
  githubFilters: {
    expanded: boolean;
  };
  widgetVisibility: {
    weather: boolean;
    github: boolean;
    nasa: boolean;
    crypto: boolean;
  };
}

/**
 *  -------------- NASA INTERFACES ----------------------
 */
export interface NasaApod {
  date: Date;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}
