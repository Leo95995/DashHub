import type { GithubWidgets } from "../../features/dashboard/components/widgetSwitcher/types";

// Flexible so that can be used everywhere

export interface ItemStatus<T>{
  data: T | T [] 
  loading: boolean
  error: string | null
}

export type IGlobalAlertStatus = "error" | "success" | "warn" | "";

export interface IGlobalAlert {
  status: IGlobalAlertStatus;
  message: string;
  description: string;
}
export interface IFilters {
  //  I dont think that expansion is never used frfr
  // weatherFilters: {
  //   expanded: boolean;
  // };
  // cryptoFilters: {
  //   expanded: boolean;
  // };
  // nasaFilters: {
  //   expanded: boolean;
  // };
  // githubFilters: {
  //   expanded: boolean;
  // };
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

// ---------------1- NASA APOD WIDGET ---------------------

export interface INasaApodData {
  date: Date;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

// --------------2- NASA NEOWS WIDGET -------------------

export interface INeoWsData {
  key: number;
  name: string;
  estimated_diameter_max: number;
  kilometers_per_hour: number;
  miss_distance_lunar: number;
  is_potentially_hazardous: boolean;
  close_approach_date: string;
}

// --------------3- NASA ROVER WIDGET -------------------

export interface RoverDetails {
  id: number
  camera: RoverCamera
  img_src: string
  earth_date: string
  rover: Rover
}

export interface RoverCamera {
  id: number
  name: string
  rover_id: number
  full_name: string
}

export interface Rover {
  id: number
  name: string
  landing_date: string
  launch_date: string
  status: string
}
//  PARTIALS  NASA

export type PartialApod = Partial<INasaApodData>;
export type PartialNeoWs = Partial<INeoWsData[]>;
export type PartialRover = Partial<RoverDetails[]>
// END NASA 




/**
 * ----------------- GITHUB INTERFACES -------------------
 */


export interface GithubContainer {
  widget: GithubWidgets;
}