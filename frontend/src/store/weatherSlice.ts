// Redux imports
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Services
import WeatherService from "../services/weather-service";
import DashboardStorage from "../services/storage/dashboard";
// Interface
import type {
  IWeatherData,
  LocationCoordinates,
} from "../services/interfaces/interfaces";


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


export type Temperature = "celsius"| "kelvin" 
const temperatureType: Temperature =  "celsius";

const initialState = {
  coordinates:  DashboardStorage.widgets.weatherWidget.getCoordinates() ?? coordinates,
  weather:  DashboardStorage.widgets.weatherWidget.getWeatherData() ?? weatherData,
  temperatureType: DashboardStorage.widgets.weatherWidget.getTemperatureType() ?? temperatureType,
  searchText:   DashboardStorage.widgets.weatherWidget.getWeatherData()?.name ??  "empoli",
  loading: false,
  error: null as string | null,
};

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
        DashboardStorage.widgets.weatherWidget.setTemperatureType(payload)
    },
    setSearchText: (state, action) => {
      state.searchText= action.payload;
    },
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
        DashboardStorage.widgets.weatherWidget.setCoordinates(state.coordinates)
        DashboardStorage.widgets.weatherWidget.setWeatherData(state.weather)
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchText, setWeatherData, setTemperatureType } = weatherSlice.actions;
