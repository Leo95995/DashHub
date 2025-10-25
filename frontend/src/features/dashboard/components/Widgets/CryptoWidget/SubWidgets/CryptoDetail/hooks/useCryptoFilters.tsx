// React
import { useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Slice
import { setCryptoDetailFilters } from "../../../../../../../../store/cryptoSlice";

export const useCryptoFilters = () => {
  const dispatch = useDispatch();

  const cryptoCurrencyList = useSelector(
    (state: any) => state.crypto.currenciesList
  );
  const filterData = useSelector(
    (state: any) => state.crypto.filterData.cryptoDetailFilters
  );
  const [detailFilters, setDetailFilters] = useState<{
    days: string;
    id: string;
  }>(filterData);

  const { data: currenciesList } = cryptoCurrencyList;

  const applyCryptoFilter = () => {
    dispatch(setCryptoDetailFilters(detailFilters) as any);
  };

  return { currenciesList, detailFilters, setDetailFilters, applyCryptoFilter };
};
