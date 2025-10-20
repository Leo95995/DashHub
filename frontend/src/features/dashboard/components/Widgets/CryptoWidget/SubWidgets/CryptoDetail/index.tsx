// React Imports
import { days } from "../../../../../../../store/data/cryptoData";
// Components
import ErrorMessage from "../../../../../../../components/Error/Error";
import ReactLoader from "../../../../../../../components/Loaders/ReactLoaders";
import LineChart from "../../LineChart/LineChart";
// Hooks
import { useChartData } from "./hooks/useChartData";
import { useCryptoFilters } from "./hooks/useCryptoFilters";

const CryptoDetail: React.FC = () => {
  const { chartData, detailData, detailLoading, detailError } = useChartData();

  const { currenciesList, detailFilters, setDetailFilters, applyCryptoFilter } =
    useCryptoFilters();

  if (detailLoading) {
    return (
      <>
        <div className="flex flex-col gap-1 items-center justify-center transition h-40 duration-300">
          <ReactLoader /> Loading crypto details
        </div>
      </>
    );
  }

  if (detailError) {
    return <ErrorMessage message="Error while fetching crypto details data" />;
  }

  if (!detailData) {
    return <> No data to display for the chart</>;
  }

  return (
    <>
      <div className="flex items-end py-2 justify-start  relative flex-wrap gap-2">
        <div className="flex flex-col gap-2 w-24">
          <label htmlFor="timespan">Select days</label>
          <select
            name="timespan"
            value={detailFilters.days}
            onChange={(e) =>
              setDetailFilters({
                ...detailFilters,
                days: e.target.value,
              })
            }
            className="px-3 py-2 w-fit rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
          >
            {days?.map((option: string) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col  gap-2">
          <label htmlFor="crypto-selector">Select currency </label>
          <select
            value={detailFilters.id}
            name="crypto-selector"
            onChange={(e) =>
              setDetailFilters({
                ...detailFilters,
                id: e.target.value,
              })
            }
            className="px-3 py-2  w-40 sm:w-50 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
          >
            {currenciesList.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <button
            onClick={applyCryptoFilter}
            className="ml-1 px-4 py-1 rounded-md cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Apply
          </button>
        </div>
      </div>
      {chartData?.data && (
        <div className="w-full  flex-1 relative flex flex-col max-h-full">
          <LineChart data={chartData?.data} />
        </div>
      )}
    </>
  );
};

export default CryptoDetail;
