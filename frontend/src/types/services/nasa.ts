// Nasa interfaces

export interface NeoWsResponse {
  near_earth_objects: INearObject;
  element_count: number;
}

export interface INearObject {
  [key: string]: any;
}

export type INear = keyof INearObject;

export type CmeResponse = any[];
