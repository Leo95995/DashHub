import type { CryptoWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import type { ICryptoTrendings } from "../../mappers/cryptoMapper";
import type { ItemStatus } from "../interfaces/interfaces";

/**
 * DATA FOR GITHUB SERVICES
 */
const cryptoData: ItemStatus<ICryptoTrendings> = {
  data: {} as ICryptoTrendings,
  loading: false,
  error: null,
};

const selectedWidget : CryptoWidgets = 'Trending Cryptos'


// Exported initial state
export const initialState = {
  cryptoData,
  selectedWidget
};
