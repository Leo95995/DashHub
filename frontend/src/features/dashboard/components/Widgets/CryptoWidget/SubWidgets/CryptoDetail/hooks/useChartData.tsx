// React Imports
import { useEffect, useState } from "react";
// Redux
import { useSelector } from "react-redux";
// Types
import type { ILineChartData } from "../../../types";
// Utils
import { regularTimeStampToTime } from "../../../../../../../../utils/weather-utils";

export const useChartData = () => {
  const cryptoDetailData = useSelector((state: any) => state.crypto.crypto_details_data);
  const {data:detailData, loading: detailLoading, error: detailError} = cryptoDetailData
  const [chartData, setChartData] = useState<ILineChartData>({
    data: {
      labels: [],
      datasets: [{ label: "", data: [], backgroundColor: "", borderColor: "" }],
    },
  });

//   
  useEffect(() => {
    if (detailData) {
      prepareLineChartData(detailData);
    }
  }, [detailData]);


//  Prepare the data used to generate the Line Chart
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



    datas?.map((detail: number[]) => {

      res.data.labels.push(regularTimeStampToTime(detail[0], 0));
      res.data.datasets[0].label = "Prices Trend EUR";
      res.data.datasets[0].data.push(detail[1]);
      res.data.datasets[0].backgroundColor = "rgb(255, 99, 132)";
      res.data.datasets[0].borderColor = "rgba(255, 99, 132, 0.5)";
    });

    setChartData(res);
  };

  return {chartData, detailData, detailLoading, detailError};
};
