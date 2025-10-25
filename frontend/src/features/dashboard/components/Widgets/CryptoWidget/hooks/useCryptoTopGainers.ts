// React & Redux
import { useEffect } from "react";
// Store
import { fetchTopGainers } from "../../../../../../store/cryptoSlice";
import type { ICryptoHook } from "../types";

export const useCryptoTopGainers = ({
  cryptoFilterData,
  dispatch,
}: ICryptoHook): void => {
  const { genericFilters } = cryptoFilterData;

    useEffect(() => {
    getTopGainers();
  }, [genericFilters]);

  const getTopGainers = async () => {
    await dispatch(fetchTopGainers(cryptoFilterData) as any);
  };

};
