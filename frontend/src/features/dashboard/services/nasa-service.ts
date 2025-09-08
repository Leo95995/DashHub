import type { NasaApod } from "../../../store/interfaces/interfaces";

const NasaService = () => {
  const nasa_url = `https://api.nasa.gov/planetary/apod?api_key=${
    import.meta.env.VITE_NASA_API
  }`;

  const get_nasa_data = async () => {
    try {
      const res = await fetch(nasa_url, { method: "GET" });
      const data:NasaApod = await res.json();
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

  return { get_nasa_data };
};

export default NasaService;
