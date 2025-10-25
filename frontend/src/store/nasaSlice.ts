import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Nasda service
import { initialState } from "./data/nasaData";
import nasaKey from "../services/storage/nasa";
import NasaService from "../services/nasa";
import type { CMEData } from "../types/store/nasa";

const { get_apod_data, get_cme_data, get_neoWs_data } = NasaService();

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

export const fetch_cme_data = createAsyncThunk(
  "nasa/fetchCme",
  async (_, { rejectWithValue }) => {
    try {
      const cme_data = await get_cme_data();
      if (!cme_data) {
        return rejectWithValue("Error while fetching rover data");
      }
      const { data } = cme_data;
      return data;
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
      nasaKey.setSelectedWidget(action.payload);
    },
    setFullScreenImage(state, action) {
      state.apodStatus.fullScreenImage = action.payload;
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
      // CMe data thunk
      .addCase(fetch_cme_data.pending, (state) => {
        state.cmeStatus.loading = true;
        state.cmeStatus.error = null;
      })
      .addCase(fetch_cme_data.fulfilled, (state, action) => {
        state.cmeStatus.data = action.payload as CMEData[];
        state.cmeStatus.loading = false;
        state.cmeStatus.error = null;
      })
      .addCase(fetch_cme_data.rejected, (state, action) => {
        state.cmeStatus.loading = false;
        state.cmeStatus.error = action.payload as string;
      });
  },
});

export const { setSelectedWidget, setFullScreenImage } = nasaSlice.actions;
