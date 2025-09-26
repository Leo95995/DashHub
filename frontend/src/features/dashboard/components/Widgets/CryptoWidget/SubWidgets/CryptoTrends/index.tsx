import { useSelector } from "react-redux";
import type { ItemStatus } from "../../../../../../../store/interfaces/interfaces";
import type { ICryptoTrendings } from "../../../../../../../mappers/cryptoMapper";
import { setCryptoTrendingFilters } from "../../../../../../../store/cryptoSlice";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import CryptoList from "./components/crypto-list";
import FilterList from "./components/filterList/filter-list";

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

  const [cryptoLocalFilters, setCryptoLocalFilters] = useState<{
    ids: string[];
  }>({ ids: ids ?? [] });

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
      setCryptoLocalFilters({ ids: newIds });
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
                  cryptoLocalFilters?.ids?.includes(option)
                    ? "text-amber-500 font-medium"
                    : ""
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
          <FilterList
            filters={cryptoLocalFilters?.ids}
            onClick={changeLocalFilters}
          />
        </div>
        {/* Item list of crypto datas */}
        <CryptoList items={data} />
      </div>
    );
  };

  return <>{renderData()}</>;
};

export default CryptoTrendings;
