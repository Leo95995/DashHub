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


export interface NasaItemStatus<T>{
  data: T | T [] // Thats pretty flexible. but it requires more check
  loading: boolean
  error: string | null
}
// --------------- NASA APOD WIDGET ---------------------

export interface INasaApodData {
  date: Date;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

// -------------- NASA NEOWS WIDGET -------------------

export interface INeoWsData {
  key: number;
  name: string;
  estimated_diameter_max: number;
  kilometers_per_hour: number;
  miss_distance_lunar: number;
  is_potentially_hazardous: boolean;
  close_approach_date: string;
}



// -------------- NASA ROVER WIDGET -------------------

export interface INasaRover {

}
