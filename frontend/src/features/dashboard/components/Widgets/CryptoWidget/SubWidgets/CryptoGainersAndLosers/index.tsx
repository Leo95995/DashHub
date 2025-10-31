import { useDispatch, useSelector } from "react-redux";
import GenericSelect from "../../../../../../../components/Select/Select";
import { setGenericCryptoFilters } from "../../../../../../../store/cryptoSlice";
import { filterCurrenciesList } from "../../../../../../../store/data/cryptoData";
import ErrorMessage from "../../../../../../../components/Error/Error";
import React from "react";
import LoaderWithMessage from "../../../../../../../components/Loaders/LoaderWithMessage";
import type { ICryptoTopGainers } from "../../../../../../../types/store/crypto";

const CryptoGainersAndLosers: React.FC = () => {
  const topGainerData = useSelector(
    (state: any) => state.crypto.crypto_top_data
  );
  const { data, loading, error } = topGainerData;
  const { genericFilters } = useSelector(
    (state: any) => state.crypto.filterData
  );

  console.log(topGainerData);

  const dispatch = useDispatch();

  if (loading) {
    return (
      <LoaderWithMessage text="Loading top cryptos gainers & losers datas" />
    );
  }

  if (error) {
    return (
      <>
        {" "}
        <ErrorMessage
          message={"Error while fetching crypto gainers & losers datas"}
        />{" "}
      </>
    );
  }

  if (!data || !Object.keys(data)?.length) {
    return <> No data to display</>;
  }

  // here should not have a multiselection
  const handleSelection = (value: string) => {
    if (genericFilters.currency === value) {
      return;
    }
    dispatch(setGenericCryptoFilters({ currency: value }) as any);
  };

  return (
    <>
      <div className="flex gap-2">
        <h3 className="text-xl flex font-semibold py-2 w-full justify-center">
                   Gainers & Losers
        </h3>
      </div>
         <GenericSelect
          itemList={filterCurrenciesList}
          onSelection={(value) => handleSelection(value)}
          defaultText={genericFilters?.currency}
          selectedList={[genericFilters?.currency]}
          listPlacement="right-7"
          closePlacement="right-0"
        />
      <div className="rounded-lg py-4 grid grid-cols-1 lg:grid-cols-2 gap-2 h-70  overflow-y-scroll overflow-x-hidden">
        {data?.map((coin: ICryptoTopGainers) => {
          return (
            <React.Fragment key={coin.id}>
              <div className="flex items-center cursor-pointer hover:rounded-md hover:bg-gradient-to-r from-gray-200 to-gray-500 hover:scale-105 hover:text-black gap-3 p-2 border dark:border-gray-600 border-gray-200 rounded transition">
                <img
                  src={coin.image}
                  alt={`Logo of ${coin.name}`}
                  className="w-8 h-8 rounded-full "
                  decoding="async"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="font-bold overflow-ellipsis line-clamp-1">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                  <span className="text-sm text-gray-500">
                    {genericFilters?.currency == "eur" ? (
                      <>€ {coin.price.toLocaleString()} </>
                    ) : (
                      <> $ {coin.price.toLocaleString()}</>
                    )}
                  </span>
                  <div
                    className={`font-semibold text-xs ${
                      coin.change24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {coin.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CryptoGainersAndLosers;
