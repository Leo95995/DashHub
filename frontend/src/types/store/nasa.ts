// NASA WIDGETS

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
  earth: boolean;
  eta: string | null;
  kpIndex: number | null;
}

export interface CMEData {
  id: string;
  startTime: string;
  speed: number | null;
  type: string | null;
  sourceLocation: string;
  note: string;
  link: string;
  impact: CMEImpact;
}

export type PartialApod = Partial<INasaApodData>;
export type PartialNeoWs = Partial<INeoWsData[]>;
export type PartialCME = Partial<CMEData[]>;
