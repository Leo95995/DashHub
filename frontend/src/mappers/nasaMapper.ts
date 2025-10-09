/**
 * Neows data mapper
 */

import type { INeoWsData, RoverDetails } from "../store/interfaces/interfaces";

export interface NeoWsResponse {
  near_earth_objects: INearObject;
  element_count: number;
}

export interface INearObject {
  [key: string]: any;
}

type INear = keyof INearObject;

export interface MarsRoverResponse {
  photos: RoverDetails[]
}

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
 * Rover data mapper
 */
const roverMapper = (data: MarsRoverResponse) : RoverDetails[]=> {
  const { photos } = data
  const toRet = []
  for(const photo of photos){

    let object: RoverDetails = {
      id: photo.id,
      camera: {
        id: photo.camera.id,
        name: photo.camera.name,
        rover_id: photo.camera.rover_id,
        full_name: photo.camera.full_name
      },
      img_src: photo.img_src,
      earth_date: photo.earth_date,
      rover: {
        id: photo.rover.id ?? null,
        name: photo.rover.name ?? '',
        landing_date: photo.rover.landing_date ?? '',
        launch_date: photo.rover.launch_date ?? '',
        status: photo.rover.status ?? ''
      }
    }

    toRet.push(object);
  }

  return toRet;
};

export const NasaMappers = {
  neowsMapper,
  roverMapper,
};
