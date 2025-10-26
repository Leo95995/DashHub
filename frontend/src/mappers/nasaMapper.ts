// Types
import type { NeoWsResponse, CmeResponse, INearObject } from "../types/services/nasa";
import type { INeoWsData, CMEData } from "../types/store/nasa";

const neowsMapper = (neowsResponse: NeoWsResponse) => {
  const arr: Array<INeoWsData> = [];
  const { element_count, near_earth_objects } = neowsResponse;

    
    near_earth_objects.forEach((obj : INearObject, index: number) => {
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


  return { element_count, neows_data: arr };
};

const CmeMapper = (data: CmeResponse): CMEData[] => {
  const cme_result: CMEData[] = [];

  for (const element of data) {
    const analyses = element.cmeAnalyses.find(
      (e: any) => e.isMostAccurate || {}
    );
    const enlil = analyses.enlilList?.[0] || {};

    const mappedCme: CMEData = {
      id: element.activityID,
      startTime: element.startTime ?? "",
      speed: analyses.speed || null,
      type: analyses.type ?? null,
      sourceLocation: element.sourceLocation ?? "",
      note: element.note ?? "",
      link: element.link,
      impact: {
        earth: enlil.isEarthGb || false,
        eta: enlil.estimatedShockArrivalTime || null,
        kpIndex: enlil.kp_90 || null,
      },
    };
    cme_result.push(mappedCme);
  }
  return cme_result as CMEData[];
};

export const NasaMappers = {
  neowsMapper,
  CmeMapper,
};
