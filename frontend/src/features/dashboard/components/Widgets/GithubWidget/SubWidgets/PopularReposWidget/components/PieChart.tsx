import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { IChartData } from "../../../interfaces/interface";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface IPieChart<T> {
  data: { result: IChartData<T> };
}

const PieChart: React.FC<IPieChart<number>> = ({ data }) => {
  const dataz = data.result;

  return <Pie style={{ maxHeight: "400px" }} data={dataz} />;
};

export default PieChart;
