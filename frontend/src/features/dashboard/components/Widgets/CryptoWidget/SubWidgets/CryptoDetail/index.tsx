import { useSelector } from "react-redux";
import LineChart, { type ILineChartData } from "../../Charts/lineChart";
import { useEffect, useState } from "react";
import { regularTimeStampToTime } from "../../../../../../../utils/weather-utils";

const CryptoDetail: React.FC = () => {
  // Data to drill down to the linear chart
  const [chartData, setChartData] = useState<ILineChartData>({
    data: {
      labels: [],
      datasets: [{ label: "", data: [], backgroundColor: "", borderColor: "" }],
    },
  });
  const cryptoDetailData = useSelector(
    (state: any) => state.crypto.crypto_details_data
  );
  const { data, loading, error } = cryptoDetailData;

  const cryptoCurrencyList = useSelector(
    (state: any) => state.crypto.currenciesList
  );
  const {
    data: currenciesList,
    loading: currenciesLoading,
    error: currenciesError,
  } = cryptoCurrencyList;

  useEffect(() => {
    console.log(currenciesList);
  }, [currenciesList]);

  if (loading) {
    return <>LOading</>;
  }

  if (error) {
    return <> Error </>;
  }

  if (!data) {
    return <> no data to display</>;
  }

  const latestElement = data[data.length - 1];

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

  useEffect(() => {
    if (data) {
      prepareLineChartData(data);
    }
  }, []);

  return (
    <>
      <h2 className="text-xl font-medium pt-4">Crypto details</h2>

      <div className="flex flex-col border-2 items-end">
        <select
          name="crypto-selector"
          className="px-3 py-2 w-50 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200"
        >
          {currenciesList.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {data?.labels && <LineChart data={chartData?.data} />}
    </>
  );
};

export default CryptoDetail;
