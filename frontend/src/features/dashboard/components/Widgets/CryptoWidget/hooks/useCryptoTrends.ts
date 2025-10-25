// React & Redux
import { useEffect } from "react";
// Store
import { fetchCryptoTrendings } from "../../../../../../store/cryptoSlice";
// Types
import type { ICryptoHook } from "../types";

export const useCryptoTrends = ({  cryptoFilterData,  dispatch }: ICryptoHook): void => {
  const { cryptoTrendingFilters } = cryptoFilterData;

  useEffect(() => {
    getCryptoTrends();
  }, [cryptoTrendingFilters]);

  const getCryptoTrends = async () => {
    dispatch(fetchCryptoTrendings(cryptoFilterData) as any);
  };
};
