import { useDispatch, useSelector } from "react-redux";
import LineChart, { type ILineChartData } from "../../Charts/lineChart";
import { useEffect, useState } from "react";
import { regularTimeStampToTime } from "../../../../../../../utils/weather-utils";
import { setCryptoDetailFilters } from "../../../../../../../store/cryptoSlice";
import { setGenericCryptoFilters } from "../../../../../../../store/cryptoSlice";
import type { ICryptoFilterData } from "../../../../../../../store/data/cryptoData";

const CryptoDetail: React.FC = () => {
  // Data to drill down to the linear chart
  const [chartData, setChartData] = useState<ILineChartData>({
    data: {
      labels: [],
      datasets: [{ label: "", data: [], backgroundColor: "", borderColor: "" }],
    },
  });

  const dispatch = useDispatch();

  const cryptoDetailData = useSelector(
    (state: any) => state.crypto.crypto_details_data
  );
  const {
    data: detailData,
    loading: detailLoading,
    error: detailError,
  } = cryptoDetailData;

  const cryptoCurrencyList = useSelector(
    (state: any) => state.crypto.currenciesList
  );
  const {
    data: currenciesList,
    loading: currenciesLoading,
    error: currenciesError,
  } = cryptoCurrencyList;

  const filterData = useSelector(
    (state: any) => state.crypto.filterData.cryptoDetailFilters
  );

  const [detailFilters, setDetailFilters] = useState<{
    days: string;
    id: string;
  }>(filterData);


  const prepareLineChartData = (datas: any[]) => {
    if (!Array.isArray(datas) || !datas.length) {
      return;
    }

    const res: ILineChartData = {
      data: {
        labels: [],
        datasets: [
          { label: "", data: [], backgroundColor: "", borderColor: "" },
        ],
      },
    };

    datas?.map((detail: any) => {
      res.data.labels.push(regularTimeStampToTime(detail[0], 0));
      res.data.datasets[0].label = "Prices Trend EUR";
      res.data.datasets[0].data.push(detail[1]);
      res.data.datasets[0].backgroundColor = "rgb(255, 99, 132)";
      res.data.datasets[0].borderColor = "rgba(255, 99, 132, 0.5)";
    });

    console.log(res);
    setChartData(res);
  };

  useEffect(() => {
    if (detailData) {
      prepareLineChartData(detailData);
    }
  }, [detailData]);

  const days = ["1", "2", "3", "4", "5", "6", "7"];

  const handleFilterSet = () => {
    dispatch(setCryptoDetailFilters(detailFilters) as any);
  };

  if (detailLoading) {
    return <>LOading</>;
  }

  if (detailError) {
    return <> Error </>;
  }

  if (!detailData) {
    return <> no data to display</>;
  }

  return (
    <>
      <h2 className="text-xl font-medium pt-4">Crypto details</h2>

      <div className="flex items-end py-2 justify-start gap-2">
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
            {days.map((option: string) => {
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
            className="px-3 py-2 w-50 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
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
            onClick={handleFilterSet}
            className="dark:bg-gray-800 cursor-pointer bg-gray-200 border p-1 rounded-md"
          >
            Apply
          </button>
        </div>
      </div>
      {chartData.data && <LineChart data={chartData?.data} />}
    </>
  );
};

export default CryptoDetail;
