import type { INasaApodData, RoverDetails } from "../store/interfaces/interfaces";
import { nasaUtils } from "../utils/nasa-utils";
import { NasaMappers, type MarsRoverResponse, type NeoWsResponse } from "../mappers/nasaMapper";

const key = import.meta.env.VITE_NASA_API;
const backendUrl =  import.meta.env.VITE_BACKEND_URI


const nasa_baseurl = `${backendUrl}/nasa`

const NasaService = () => {
  /**
   * Widget Nasa - 1 contains Apod datas.
   */

  const get_apod_data = async () => {
    const apod_url = `${nasa_baseurl}/apod`;
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
  const get_mars_rover_data = async () => {
    // const rover_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos`
    const rover_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${key}`;
    
    try {
      const res = await fetch(rover_url, { method: "GET" });
      const data : MarsRoverResponse = await res.json();

      const roverData : RoverDetails[]  = NasaMappers.roverMapper(data) 
      const status = res.status;
      if (data && status === 200) {
        return { roverData: roverData, status: status, error: false };
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

    const today= nasaUtils.getTodayFormattedDate()
    const url = `${nasa_baseurl}/neows?start_date=${today}&end_date=${today}`;
    try {
      //  Refining your craft.
      const res = await fetch(url, { method: "GET" });
      const data : NeoWsResponse = await res.json();
      const status = res.status;

      if (data && status === 200) {
        const mappedData  = NasaMappers.neowsMapper(data);
        return { neoData: mappedData, status: status, error: false };
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
