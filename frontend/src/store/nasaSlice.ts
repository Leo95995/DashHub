import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Nasda service
import NasaService from "../services/nasa-service";
import type { INasaApod } from "./interfaces/interfaces";

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

// Get the data for mars rover widget
export const fetch_mars_rover_data = createAsyncThunk(
  "nasa/fetchRover",
  async (_, { rejectWithValue }) => {
    try {
      const nasa_rover_data = await get_mars_rover_data();
      if (!nasa_rover_data) {
        return rejectWithValue("Errore nel recupero");
      }
      // nasa rover
      const { nasaData } = nasa_rover_data;
      return { nasaData };
    } catch (err) {
      return rejectWithValue("Error while fetching nasa data");
    }
  }
);

export const fetch_neows_data = createAsyncThunk(
  "nasa/fetchneows",
  async (_, { rejectWithValue }) => {
    try {
      const nasa_neows_data = await get_neoWs_data();
      if (nasa_apod_data.error || !nasa_apod_data.nasaData) {
        return rejectWithValue("Errore nel recupero");
      }
    } catch (err) {
      return rejectWithValue("Error while fetching nasa data");
    }
  }
);

const nasa_apod_data: Partial<INasaApod> = {};

const initialState = {
  nasa_apod_data,
  loading: false,
  error: null as string | null,
};
/**
 * Nasa Slice
 */

export const nasaSlice = createSlice({
  name: "nasa",
  initialState,
  reducers: {
    // doing nothing . to define
    setNasaDetail(state, action) {
      state.nasa_apod_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch_apod_data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch_apod_data.fulfilled, (state, action) => {
        state.nasa_apod_data = action.payload.nasaData;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetch_apod_data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setNasaDetail } = nasaSlice.actions;
