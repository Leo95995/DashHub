import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import WeatherService from "../features/dashboard/services/weather-service";
import type {
  IWeatherData,
  LocationCoordinates,
} from "../features/dashboard/services/interfaces/interfaces";

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchByCity",
  async (city: string, { rejectWithValue }) => {
    try {
      const { get_coordinates, get_weather_data } = WeatherService();
      const coords = await get_coordinates(city);
      if (!coords || !coords.data || coords.data.length === 0) {
        return rejectWithValue("Nessuna città trovata");
      }

      const { lat, lon } = coords.data[0];
      const weather = await get_weather_data(String(lat), String(lon));

      return {
        coordinates: coords.data[0],
        weather: weather?.data as IWeatherData,
      };
    } catch (err) {
      return rejectWithValue("Errore fetch meteo");
    }
  }
);

const coordinates: Partial<LocationCoordinates> = {};

const weatherData: Partial<IWeatherData> = {};


type Temperature = "celsius"| "kelvin" 
const temperatureType: Temperature = "celsius";

const initialState = {
  coordinates: coordinates,
  weather: weatherData,
  temperatureType,
  loading: false,
  error: null as string | null,
};
/**
 * Weather slice
 */

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      const { payload } = action;
      state.weather = payload;
    },
    setTemperatureType: (state, action) =>{
        const {payload} = action
        state.temperatureType = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.coordinates = action.payload.coordinates;
        state.weather = action.payload.weather;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setWeatherData, setTemperatureType } = weatherSlice.actions;
