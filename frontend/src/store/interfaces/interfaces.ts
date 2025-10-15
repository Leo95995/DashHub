import type { GithubWidgets } from "../../features/dashboard/components/widgetSwitcher/types";

// Flexible so that can be used everywhere

export interface ItemStatus<T> {
  data: T | T[];
  loading: boolean;
  error: string | null;
  [key: string]: any;
}

export type IGlobalAlertStatus = "error" | "success" | "warn" | "";

export interface IGlobalAlert {
  status: IGlobalAlertStatus;
  message: string;
  description: string;
}
export interface IFilters {
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
  _id: string;
  date: string;
  img: string;
  title: string;
  description: string;
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

// --------------3- CME WIDGET-------------------

export interface CMEImpact {
  earth: boolean; // Colpirà la Terra
  eta: string | null; // Ora stimata di arrivo (ISO string)
  kpIndex: number | null; // Kp index stimato
}

export interface CMEData {
  id: string; // activityID dell’evento
  startTime: string; // Data/ora inizio CME
  speed: number | null; // Velocità in km/s
  type: string | null; // Tipo di CME (S, C, ecc.)
  sourceLocation: string; // Posizione sulla superficie solare
  note: string; // Descrizione breve
  link: string; // Link al dettaglio NASA
  impact: CMEImpact; // Dati impatto sulla Terra
}
//  PARTIALS  NASA CME DATAS

export type PartialApod = Partial<INasaApodData>;
export type PartialNeoWs = Partial<INeoWsData[]>;
export type PartialCME = Partial<CMEData[]>;

// END NASA PARTIALS CME DATAS

// GITHUB WIDGET INTERFACES
export interface GithubContainer {
  widget: GithubWidgets;
}
