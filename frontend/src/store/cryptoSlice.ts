// Create redux slice
import { createSlice } from "@reduxjs/toolkit";
// Thunk
import { createAsyncThunk } from "@reduxjs/toolkit";
// Github Service
import { initialState } from "./data/cryptoData";
import CryptoService from "../services/crypto-service";

const {
  getAllCryptoCurrencies,
  getAllCryptosTrend,
  getCryptoDetails,
  getTopGainersAndLosers,
} = CryptoService();

export const fetchCryptoCurrenciesList = createAsyncThunk(
  "cryptos/fetchCryptoCurrenciesList",
  async (_, { rejectWithValue }) => {
    try {
      const currencyList = await getAllCryptoCurrencies();
      if (currencyList.error || !currencyList.currencyList) {
        return rejectWithValue("Error while fetching crytpto datas");
      }
      const { currencyList: crypto_currencies } = currencyList;
      return crypto_currencies;
    } catch (err) {
      return rejectWithValue("Error while fetching crytpto datas");
    }
  }
);

export const fetchCryptoTrendings = createAsyncThunk(
  "cryptos/fetchCryptoTrendings",
  async (_, { rejectWithValue }) => {
    try {
      const crypto_trendings = await getAllCryptosTrend();
      if (crypto_trendings.error || !crypto_trendings.trending_cryptos) {
        return rejectWithValue("Error while fetching crytpto datas");
      }
      const { trending_cryptos } = crypto_trendings;
      return trending_cryptos;
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
      return crypto_details;
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
      return topGainers;
    } catch (err) {
      return rejectWithValue("Error while fetching crytpto datas");
    }
  }
);

/**
 * Here i should Show the current filters. usend then by the services-
 */

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,

  reducers: {
    setGenericCryptoFilters(state, action){
      state.filterData.genericFilters = action.payload
    },
    setCryptoTrendingFilters(state, action){
      state.filterData.cryptoTrendingFilters = action.payload
    },
    setCryptoDetailFilters(state, action){
      state.filterData.cryptoDetailFilters = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Crypto currencies list
      .addCase(fetchCryptoCurrenciesList.pending, (state) => {
        state.currenciesList.loading = true;
        state.currenciesList.error = null;
      })
      .addCase(fetchCryptoCurrenciesList.fulfilled, (state, action) => {
        state.currenciesList.data = action.payload;
        state.currenciesList.error = null;
        state.currenciesList.loading = false;
      })
      .addCase(fetchCryptoCurrenciesList.rejected, (state, action) => {
        state.currenciesList.loading = false;
        state.currenciesList.error = action.payload as string;
      })
      // Trending cryptos
      .addCase(fetchCryptoTrendings.pending, (state) => {
        state.cryptoData.loading = true;
        state.cryptoData.error = null;
      })
      .addCase(fetchCryptoTrendings.fulfilled, (state, action) => {
        state.cryptoData.data = action.payload;
        state.cryptoData.error = null;
        state.cryptoData.loading = false;
      })
      .addCase(fetchCryptoTrendings.rejected, (state, action) => {
        state.cryptoData.loading = false;
        state.cryptoData.error = action.payload as string;
      })
      // Crypto details
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.crypto_details_data.loading = true;
        state.crypto_details_data.error = null;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.crypto_details_data.data = action.payload;
        state.crypto_details_data.error = null;
        state.crypto_details_data.loading = false;
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.crypto_details_data.loading = false;
        state.crypto_details_data.error = action.payload as string;
      })
      // Crypto top currencies
      .addCase(fetchTopGainers.pending, (state) => {
        state.crypto_top_data.loading = true;
        state.crypto_top_data.error = null;
      })
      .addCase(fetchTopGainers.fulfilled, (state, action) => {
        state.crypto_top_data.data = action.payload;
        state.crypto_top_data.error = null;
        state.crypto_top_data.loading = false;
      })
      .addCase(fetchTopGainers.rejected, (state, action) => {
        state.crypto_top_data.loading = false;
        state.crypto_top_data.error = action.payload as string;
      });
  },
});

export const { setGenericCryptoFilters, setCryptoTrendingFilters, setCryptoDetailFilters  } = cryptoSlice.actions;
