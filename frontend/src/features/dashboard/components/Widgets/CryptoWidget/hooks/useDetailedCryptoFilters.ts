import { useEffect } from "react";
// Crypto details fetch
import { fetchCryptoDetails } from "../../../../../../store/cryptoSlice";
// Types
import type { ICryptoHook } from "../types";

export const useDetailedCryptoFilters = ({  cryptoFilterData,  dispatch }: ICryptoHook): void => {
  const { cryptoDetailFilters } = cryptoFilterData;

  useEffect(() => {
    if (cryptoDetailFilters) {
      getDetailedFilters();
    }
  }, [cryptoDetailFilters]);

  const getDetailedFilters = async () => {
    await dispatch(fetchCryptoDetails(cryptoFilterData) as any);
  };
};
