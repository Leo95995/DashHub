// Create redux slice
import { createSlice } from "@reduxjs/toolkit";
// Thunk
import { createAsyncThunk } from "@reduxjs/toolkit";
// Github Service
import { initialState } from "./data/cryptoData";
import CryptoService from "../services/crypto-service";

const { getAllCryptosTrend, getCryptoDetails, getTopGainersAndLosers } = CryptoService();

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

/**
 * get all details related to a single crypto
 */
export const fetchCryptoDetails = createAsyncThunk(
  "cryptos/fetchCryptoDetails",
  async (_, { rejectWithValue }) => {
    try {
      const cryptoDetails = await getCryptoDetails();
      //  
      if (cryptoDetails.error || !cryptoDetails.crypto_details) {
        return rejectWithValue("Error while fetching crytpto datas");
      }
      const { crypto_details } = cryptoDetails;
      console.log(crypto_details);
      return crypto_details ;
    } catch (err) {
      return rejectWithValue("Error while fetching crytpto datas");
    }
  }
);



export const fetchTopGainers = createAsyncThunk(
  "cryptos/fetchCryptoTopGainers",
  async (_, { rejectWithValue }) => {
    try {
      const topGainersData = await getTopGainersAndLosers();
      if (topGainersData.error || !topGainersData.topGainers) {
        return rejectWithValue("Error while fetching crytpto datas");
      }
      const { topGainers } = topGainersData;
      return topGainers ;
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
      })
       .addCase(fetchCryptoDetails.pending, (state) => {
        state.crypto_details_data.loading = true;
        state.crypto_details_data.error = null;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.crypto_details_data.data = action.payload 
        state.crypto_details_data.error = null;
        state.crypto_details_data.loading = false;
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.crypto_details_data.loading = false;
        state.crypto_details_data.error = action.payload as string;
      })
       .addCase(fetchTopGainers.pending, (state) => {
        state.crypto_top_data.loading = true;
        state.crypto_top_data.error = null;
      })
      .addCase(fetchTopGainers.fulfilled, (state, action) => {
        state.crypto_top_data.data = action.payload 
        state.crypto_top_data.error = null;
        state.crypto_top_data.loading = false;
      })
      .addCase(fetchTopGainers.rejected, (state, action) => {
        state.crypto_top_data.loading = false;
        state.crypto_top_data.error = action.payload as string;
      });
  },
});
