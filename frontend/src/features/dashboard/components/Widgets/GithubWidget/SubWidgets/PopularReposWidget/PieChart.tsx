import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { IPieChart } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<IPieChart<number>> = ({ data }) => {
  const dataz = data.result;

  return <Pie style={{ maxHeight: "250px", maxWidth: '300px' }} data={dataz} />;
};

export default PieChart;
