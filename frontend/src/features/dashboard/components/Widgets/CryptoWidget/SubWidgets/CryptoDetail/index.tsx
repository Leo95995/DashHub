import { useDispatch, useSelector } from "react-redux";
// Chart
import LineChart, { type ILineChartData } from "../../Charts/lineChart";
// React Imports
import { useEffect, useState } from "react";
import { regularTimeStampToTime } from "../../../../../../../utils/weather-utils";
import {
  setCryptoDetailFilters,
  setGenericCryptoFilters,
} from "../../../../../../../store/cryptoSlice";
import {
  days,
  filterCurrenciesList,
} from "../../../../../../../store/data/cryptoData";
// Components
import GenericSelect from "../../../../../../../components/select";
import ErrorMessage from "../../../../../../../components/Error/error";
import ReactLoader from "../../../../../../../components/loader";

const CryptoDetail: React.FC = () => {
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

  useEffect(() => {
    if (detailData) {
      prepareLineChartData(detailData);
    }
  }, [detailData]);

  const cryptoCurrencyList = useSelector(
    (state: any) => state.crypto.currenciesList
  );

  const {
    data: currenciesList,
    loading: currenciesLoading,
    error: currenciesError,
  } = cryptoCurrencyList;

  const { genericFilters } = useSelector(
    (state: any) => state.crypto.filterData
  );

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

    setChartData(res);
  };

  const handleFilterSet = () => {
    dispatch(setCryptoDetailFilters(detailFilters) as any);
  };

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
    return <> no data to display</>;
  }

  const handleSelection = (value: string) => {
    if (genericFilters.currency === value) {
      return;
    }
    dispatch(setGenericCryptoFilters({ currency: value }) as any);
  };

  return (
    <>
      <div className="flex justify-start ">
        <GenericSelect
          itemList={filterCurrenciesList}
          onSelection={(value) => handleSelection(value)}
          defaultText={genericFilters?.currency}
          selectedList={[genericFilters?.currency]}
          placement="start"
          minHeigth="min-h-8"
        />
      </div>
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
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200  border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
          >
            Apply
          </button>
        </div>
      </div>
      {chartData?.data && <LineChart data={chartData?.data} />}
    </>
  );
};

export default CryptoDetail;
