/**
 * Neows data mapper
 */

import * as neowsTemplate from "../services/nasa-neows-template.json";
import type { INeoWsData } from "../store/interfaces/interfaces";


export interface NeoWsResponse {
  near_earth_objects: INearObject;
  element_count: number;
}

export interface INearObject {
  [key: string]: any;
}

type INear = keyof INearObject;
/**
 * 
 *"name" → nome/identificativo dell’oggetto.

  "estimated_diameter.kilometers.estimated_diameter_max" → diametro massimo stimato in km.

"close_approach_data[0].relative_velocity.kilometers_per_hour" → velocità relativa in km/h.

"close_approach_data[0].miss_distance.lunar" → distanza minima in distanze lunari (LD).

"is_potentially_hazardous_asteroid" → booleano che indica se è considerato potenzialmente pericoloso.

"close_approach_data[0].close_approach_date" → data di avvicinamento.
 */

const neowsMapper = (neowsResponse: NeoWsResponse) => {
  const arr: Array<INeoWsData> = [];
  const { element_count, near_earth_objects } = neowsResponse;

  for (const key in near_earth_objects) {
    const keyz = key as keyof INear;
    const near: any[] = near_earth_objects[keyz] as any;

    near.forEach((obj, index) => {
      let mappedObj: INeoWsData = {
        key: index,
        name: obj.name,
        estimated_diameter_max:
          obj.estimated_diameter.kilometers.estimated_diameter_max,
        kilometers_per_hour:
          obj.close_approach_data[0].relative_velocity.kilometers_per_hour,
        miss_distance_lunar: obj.close_approach_data[0].miss_distance.lunar,
        is_potentially_hazardous: obj.is_potentially_hazardous_asteroid,
        close_approach_date: obj.close_approach_data[0].close_approach_date,
      };
      arr.push(mappedObj);
    });
  }
  return { element_count, neows_data: arr };
};

/**
 * Apod data mapper
 */
const apodMapper = () => {
  const mappedObj = {};
  return mappedObj;
};

/**
 * Rover data mapper
 */
const roverMapper = () => {};

export const NasaMappers = {
  neowsMapper,
  apodMapper,
  roverMapper,
};
