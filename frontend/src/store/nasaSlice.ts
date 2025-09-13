import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Nasda service
import NasaService from "../services/nasa-service";
import type { RoverDetails } from "./interfaces/interfaces";
import { initialState } from "./data/nasaData";

const { get_apod_data, get_mars_rover_data, get_neoWs_data } = NasaService();

export const fetch_apod_data = createAsyncThunk(
  "nasa/fetchApod",
  async (_, { rejectWithValue }) => {
    try {
      const nasa_apod_data = await get_apod_data();
      if (nasa_apod_data.error || !nasa_apod_data.nasaData) {
        return rejectWithValue("Errore nel recupero");
      }
      const { nasaData } = nasa_apod_data;
      return { nasaData };
    } catch (err) {
      return rejectWithValue("Error while fetching nasa data");
    }
  }
);

export const fetch_mars_rover_data = createAsyncThunk(
  "nasa/fetchRover",
  async (_, { rejectWithValue }) => {
    try {
      const nasa_rover_data = await get_mars_rover_data();
      if (!nasa_rover_data) {
        return rejectWithValue("Error while fetching rover data");
      }
      const { roverData } = nasa_rover_data;
      return { roverData };
    } catch (err) {
      return rejectWithValue("Error while fetching rover data");
    }
  }
);

export const fetch_neows_data = createAsyncThunk(
  "nasa/fetchneows",
  async (_, { rejectWithValue }) => {
    try {
      const nasa_neows_data = await get_neoWs_data();
      if (nasa_neows_data.error || !nasa_neows_data.neoData) {
        return rejectWithValue("Errore nel recupero");
      }
      const { neoData } = nasa_neows_data;
      const { neows_data } = neoData;
      return { neows_data };
    } catch (err) {
      return rejectWithValue("Error while fetching nasa data");
    }
  }
);

/**
 * Nasa Slice
 */
export const nasaSlice = createSlice({
  name: "nasa",
  initialState,
  reducers: {
    setSelectedWidget(state, action) {
      state.widgetSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Nasa apod thunk
      .addCase(fetch_apod_data.pending, (state) => {
        state.apodStatus.loading = true;
        state.apodStatus.error = null;
      })
      .addCase(fetch_apod_data.fulfilled, (state, action) => {
        state.apodStatus.data = action.payload.nasaData;
        state.apodStatus.loading = false;
        state.apodStatus.error = null;
      })
      .addCase(fetch_apod_data.rejected, (state, action) => {
        state.apodStatus.loading = false;
        state.apodStatus.error = action.payload as string;
      })
      // Nasa Near Earth Objects thunk
      .addCase(fetch_neows_data.pending, (state) => {
        state.neoWsStatus.loading = true;
        state.neoWsStatus.error = null;
      })
      .addCase(fetch_neows_data.fulfilled, (state, action) => {
        state.neoWsStatus.data = action.payload.neows_data;
        state.neoWsStatus.loading = false;
        state.neoWsStatus.error = null;
      })
      .addCase(fetch_neows_data.rejected, (state, action) => {
        state.neoWsStatus.loading = false;
        state.neoWsStatus.error = action.payload as string;
      })
      // Nasa Mars Rover data Thunk
      .addCase(fetch_mars_rover_data.pending, (state) => {
        state.roverStatus.loading = true;
        state.neoWsStatus.error = null;
      })
      .addCase(fetch_mars_rover_data.fulfilled, (state, action) => {
        state.roverStatus.data = action.payload.roverData as RoverDetails[];
        state.roverStatus.loading = false;
        state.roverStatus.error = null;
      })
      .addCase(fetch_mars_rover_data.rejected, (state, action) => {
        state.roverStatus.loading = false;
        state.roverStatus.error = action.payload as string;
      });
  },
});

export const { setSelectedWidget } = nasaSlice.actions;
