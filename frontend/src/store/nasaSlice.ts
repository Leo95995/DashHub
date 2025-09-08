import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import NasaService from "../features/dashboard/services/nasa-service";
import type { NasaApod } from "./interfaces/interfaces";

export const fetchNasaData = createAsyncThunk(
  "nasa/fetchApod",
  async (_, { rejectWithValue }) => {

    console.log("entri???");
    try {
      const { get_nasa_data } = NasaService();
      const nasa_apod_data = await get_nasa_data();
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

const nasa_apod_data: Partial<NasaApod> = {};

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
    setNasaDetail(state,action){
        state.nasa_apod_data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNasaData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNasaData.fulfilled, (state, action) => {
        state.nasa_apod_data = action.payload.nasaData;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNasaData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setNasaDetail } = nasaSlice.actions;
