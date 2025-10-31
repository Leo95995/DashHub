// Types
import type { CryptoWidgets } from "../../features/dashboard/types";
// Services
import cryptoKey from "../../services/storage/crypto";
// Types
import type { ItemStatus } from "../../types/common/status";
import type {
  ICryptoTrendings,
  ICryptoDetails,
  ICryptoTopGainers,
  currency,
  ICryptoFilterData,
} from "../../types/store/crypto";

const currenciesList: ItemStatus<string> = {
  data: [] as string[],
  loading: false,
  error: null,
};

const cryptoData: ItemStatus<ICryptoTrendings> = {
  data: {} as ICryptoTrendings,
  loading: false,
  error: null,
};

const crypto_details_data: ItemStatus<ICryptoDetails> = {
  data: {} as ICryptoDetails,
  loading: false,
  error: null,
};

const crypto_top_data: ItemStatus<ICryptoTopGainers> = {
  data: {} as ICryptoTopGainers,
  loading: false,
  error: null,
};

const selectedWidget: CryptoWidgets =
  cryptoKey.getSelectedWidget() ?? "Top Cryptos";

export const filterCurrenciesList: currency[] = ["eur", "usd"];

const filterData: ICryptoFilterData = {
  genericFilters: {
    currency: "eur",
  },
  cryptoTrendingFilters: {
    ids: ["bitcoin", "ethereum", "cardano"],
  },
  cryptoDetailFilters: {
    days: "1",
    id: "bitcoin",
  },
};

// Default crypto data

export const days = ["1", "7", "30", "90", "180", "365"];

// Exported initial state
export const initialState = {
  currenciesList,
  cryptoData, // Trending crypto
  crypto_details_data, // Crypto Details
  crypto_top_data, // Crypto Top Gainers
  selectedWidget,
  filterData, // Handles all the filters details
};
