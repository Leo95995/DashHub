// Types
import type { CmeResponse, NeoWsResponse } from "../../types/services/nasa";
import type { INasaApodData, CMEData } from "../../types/store/nasa";
// Utils
import { nasaUtils } from "../../utils/nasa-utils";
// Mappers
import { NasaMappers } from "../../mappers/nasaMapper";
// Env basepaths
import { services_url } from "../../utils/environment";



const NasaService = () => {
  const get_apod_data = async () => {
    const apod_url = `${services_url.nasa}/apod`;
    try {
      const res = await fetch(apod_url, { method: "GET" });
      const data: INasaApodData = await res.json();
      const status = res.status;
      if (data && status === 200) {
        return { nasaData: data, status: status, error: false };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  /**
   * Widget Nasa - 2 contains mars rover data
   */

  const get_cme_data = async () => {
    const today = nasaUtils.getTodayFormattedDate();
    const yesterday = nasaUtils.getTodayFormattedDate(-1);

    const cmeUrl = `${services_url.nasa}/cme?start_date=${yesterday}&end_date=${today}`;

    try {
      const res = await fetch(cmeUrl, { method: "GET" });
      const data: CmeResponse = await res.json();
      const cme_data: CMEData[] = NasaMappers.CmeMapper(data);

      const status = res.status;

      if (data && status === 200) {
        return { data: cme_data, status: status, error: false };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  /**
   *  Widget nasa - 3 contains epic data
   */
  const get_neoWs_data = async () => {
    const today = nasaUtils.getTodayFormattedDate();
    const url = `${services_url.nasa}/neows?start_date=${today}&end_date=${today}`;
    try {
      const res = await fetch(url, { method: "GET" });
      const data: NeoWsResponse = await res.json();
      const status = res.status;
      if (data && status === 200) {
        const mappedData = NasaMappers.neowsMapper(data);
        return { neoData: mappedData, status: status, error: false };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  return { get_apod_data, get_cme_data, get_neoWs_data };
};

export default NasaService;
