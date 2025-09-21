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

  const prepareLineChartData = (datas: any) => {
    const res: ILineChartData = {
      data: {
        labels: [],
        datasets: [
          { label: "", data: [], backgroundColor: "", borderColor: "" },
        ],
      },
    };
    console.log("entro");

    datas.map((detail: any) => {
 
      res.data.labels.push(regularTimeStampToTime(detail[0], 0));
      res.data.datasets[0].label = 'Prices Trend EUR';
      res.data.datasets[0].data.push(detail[1]);
      res.data.datasets[0].backgroundColor = "rgb(255, 99, 132)";
      res.data.datasets[0].borderColor = "rgba(255, 99, 132, 0.5)";
    });

    setChartData(res);
  };

  useEffect(() => {
    prepareLineChartData(data);
  }, []);

  return (
    <>
      Crypto Details
      <LineChart data={chartData.data} />
    </>
  );
};

export default CryptoDetail;
