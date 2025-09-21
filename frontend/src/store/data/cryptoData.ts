import type { CryptoWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import type {
  ICryptoTrendings,
  ICryptoDetails,
  ICryptoTopGainers,
} from "../../mappers/cryptoMapper";
import type { ItemStatus } from "../interfaces/interfaces";

/**
 * DATA FOR GITHUB SERVICES
 */
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

// Exported initial state
export const initialState = {
  cryptoData, // Data related to trending crypto
  crypto_details_data,
  crypto_top_data,
  selectedWidget,
};
