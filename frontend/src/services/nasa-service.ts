import type { INasaApod } from "../store/interfaces/interfaces";
import { nasaUtils } from "../utils/nasa-utils";

const key = import.meta.env.VITE_NASA_API;

const NasaService = () => {
  /**
   * Widget Nasa - 1 contains Apod datas.
   */
  const get_apod_data = async () => {
    const nasa_url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
    try {
      const res = await fetch(nasa_url, { method: "GET" });
      const data: INasaApod = await res.json();
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
  const get_mars_rover_data = async () => {
    const rover_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`;
    try {
      const res = await fetch(rover_url, { method: "GET" });
      const data = await res.json();
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
   *  Widget nasa - 3 contains epic data
   */
  const get_neoWs_data = async () => {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${nasaUtils.getTodayFormattedDate()}&end_date=${nasaUtils.getTodayFormattedDate()}&api_key=${key}`;
    try {
      //  Refining your craft.
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
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

  return { get_apod_data, get_mars_rover_data, get_neoWs_data };
};

export default NasaService;
