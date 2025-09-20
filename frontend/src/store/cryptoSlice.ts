// Create redux slice
import { createSlice } from "@reduxjs/toolkit";
// Thunk
import { createAsyncThunk } from "@reduxjs/toolkit";
// Github Service
import { initialState } from "./data/cryptoData";
import CryptoService from "../services/crypto-service";

const { getAllCryptosTrend } = CryptoService();

export const fetchCryptoTrendings = createAsyncThunk(
  "cryptos/fetchCryptoTrendings",
  async (_, { rejectWithValue }) => {
    try {
      const crypto_trendings = await getAllCryptosTrend();
      if (crypto_trendings.error || !crypto_trendings.trending_cryptos) {
        return rejectWithValue("Error while fetching crytpto datas");
      }
      const { trending_cryptos } = crypto_trendings;
      return trending_cryptos ;
    } catch (err) {
      return rejectWithValue("Error while fetching crytpto datas");
    }
  }
);

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCryptoTrendings(state, action) {
      state.cryptoData.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Trending cryptos
      .addCase(fetchCryptoTrendings.pending, (state) => {
        state.cryptoData.loading = true;
        state.cryptoData.error = null;
      })
      .addCase(fetchCryptoTrendings.fulfilled, (state, action) => {
        state.cryptoData.data = action.payload 
        state.cryptoData.error = null;
        state.cryptoData.loading = false;
      })
      .addCase(fetchCryptoTrendings.rejected, (state, action) => {
        state.cryptoData.loading = false;
        state.cryptoData.error = action.payload as string;
      });
  },
});
