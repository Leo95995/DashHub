import { useSelector } from "react-redux";
import type { ItemStatus } from "../../../../../../../store/interfaces/interfaces";
import type { ICryptoTrendings } from "../../../../../../../mappers/cryptoMapper";
import { setCryptoTrendingFilters } from "../../../../../../../store/cryptoSlice";
import { Check, CircleCheck, Save } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";

const CryptoTrendings: React.FC = () => {
  const crypto_data = useSelector(
    (state: any) => state.crypto.cryptoData as ItemStatus<ICryptoTrendings>
  );
  const { data, error, loading } = crypto_data;
  // Check if is an array
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

 

  const {
    data: currenciesList,
    error: currenciesError,
    loading: currenciesLoading,
  } = useSelector((state: any) => state.crypto.currenciesList);
  // Data for crypto filters
  const filterData = useSelector((state: any) => state.crypto.filterData);
  const { ids } = filterData?.cryptoTrendingFilters;

   const [cryptoLocalFilters, setCryptoLocalFilters] = useState<{ids: string[]}>({ids: ids ?? []});

  const renderData = () => {
    if (loading) {
      return <> Loading</>;
    }

    if (error) {
      return <>{error as string}</>;
    }

    if (!data) {
      return <>No data found</>;
    }

    return <> {renderTrendingCrypto()}</>;
  };

  // Ui

  const dispatchSelection = () => {
      dispatch(setCryptoTrendingFilters({ ids: cryptoLocalFilters?.ids }));
    
  };

  const changeLocalFilters = (option: string) => {
    let newIds = [];

    if (cryptoLocalFilters.ids.includes(option)) {
      newIds = cryptoLocalFilters.ids.filter((opt: string) => opt !== option);
    } else {
      newIds = [...cryptoLocalFilters.ids, option];
    }
    if (newIds.length <= 4 && newIds.length >= 1) {
      setCryptoLocalFilters({ids:newIds})
    } else {
      alert("You can't select more than 4 and lesser than 1 cryptoz");
    }
  };

  const renderTrendingCrypto = () => {
    if (!data || Array.isArray(data)) return null;

    return (
      <div className="flex flex-wrap gap-2 justify-center">
        <h2 className="text-xl font-medium pt-4">Crypto Trendings</h2>
        {/* Should be extracted. this is the logic for crypto trending section */}
        <div className="flex justify-end pb-6 w-full relative h-28 px-12">
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-5 cursor-pointer z-20 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition-colors"
              aria-label="Chiudi dropdown"
            >
              <Close />
            </button>
          )}
          <ul
            className={`absolute w-48 z-20 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-md overflow-auto transition-max-h duration-300 ${
              isOpen ? "max-h-56" : "max-h-10 overflow-hidden"
            }`}
          >
            {currenciesList?.map((option: string) => (
              <li
                key={option}
                onClick={
                  isOpen
                    ? () => changeLocalFilters(option)
                    : () => setIsOpen(true)
                }
                className={`p-2 cursor-pointer hover:bg-blue-300 transition-colors flex justify-between items-center ${
                  cryptoLocalFilters?.ids?.includes(option) ? "text-amber-500 font-medium" : ""
                }`}
              >
                <span>{option}</span>
                {cryptoLocalFilters?.ids?.includes(option) && (
                  <span
                    className="
              inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
              bg-green-500 text-white shadow-sm gap-1
            "
                  >
                    <CircleCheck size={14} /> Selected
                  </span>
                )}
              </li>
            ))}
          </ul>
          {/* List of filters selected */}
          <div className="py-2 absolute left-0 rounded-md overflow-scroll text-nowrap flex gap-2 w-full  top-12">
            {cryptoLocalFilters?.ids?.map((id: string) => (
              <span className="px-2 py-1 border hover:bg-gray-800 hover:text-white text-sm hover:filter flex items-center justify-center gap-1 rounded-2xl">
                {id}{" "}
                <button
                  className="cursor-pointer hover:scale-105"
                  onClick={() => changeLocalFilters(id) as any}
                >
                  <Close
                    className="hover:scale-120"
                    style={{ fontSize: "12px" }}
                  />
                </button>
              </span>
            ))}
            <button onClick={()=> dispatch(dispatchSelection()as any)} className="border px-2 rounded-2xl hover:scale-105 cursor-pointer transition-all duration-100">
              Apply filters
            </button>
          </div>
        </div>

        {(Object.keys(data) as Array<keyof ICryptoTrendings>).map(
          (crypto_coin) => {
            const current = data[crypto_coin];
            const eurChangeColor =
              current?.eur_24h_change >= 0 ? "text-green-500" : "text-red-500";
            const usdChangeColor =
              current?.usd_24h_change >= 0 ? "text-green-500" : "text-red-500";

            return (
              <div
                key={crypto_coin}
                className="bg-gray-700 text-white p-2 w-full max-w-82 rounded-md flex flex-col hover:bg-gray-600 transition-colors duration-200"
              >
                <h3 className="text-sm font-bold uppercase">{crypto_coin}</h3>
                <p className="text-xs ">
                  <span className="font-semibold">EUR: </span>{" "}
                  {current.eur.toFixed(2)}{" "}
                  <span className={eurChangeColor}>
                    {current.eur_24h_change.toFixed(2)}%
                  </span>
                </p>
                <p className="text-xs">
                  <span className="font-semibold">USD: </span>{" "}
                  {current.usd.toFixed(2)}{" "}
                  <span className={usdChangeColor}>
                    {current.usd_24h_change.toFixed(2)}%
                  </span>
                </p>
              </div>
            );
          }
        )}
      </div>
    );
  };

  return <>{renderData()}</>;
};

export default CryptoTrendings;
