import type { CryptoWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import type {
  ICryptoTrendings,
  ICryptoDetails,
  ICryptoTopGainers,
} from "../../mappers/cryptoMapper";
import type { ItemStatus } from "../interfaces/interfaces";

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

const selectedWidget: CryptoWidgets = "Trending Cryptos";

type currency = "eur" | "usd";

export interface ICryptoFilterData {
  genericFilters: {
    currency: currency;
  };
  cryptoTrendingFilters: {
    ids: string[];
  };
  cryptoDetailFilters: {
    days: string;
    id: string; // The crypto currency name to take details
  };
}


/**
 * This datas then should be drilled down
 */
const filterData: ICryptoFilterData = {
  genericFilters: {
    currency: "eur"
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

  export const days = ["1", "2", "3", "4", "5", "6", "7"];


// Exported initial state
export const initialState = {
  currenciesList,
  cryptoData, // Data related to trending crypto
  crypto_details_data,
  crypto_top_data,
  selectedWidget,
  filterData, // Handles all the filters details
};
