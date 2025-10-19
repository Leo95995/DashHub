import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ILineChartData } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const LineChart: React.FC<ILineChartData> = ({ data }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Trending values`,
      },
    },
  };

  return (
    <div className="w-full flex-1 relative md:max-h-60">
      <Line options={defaultOptions} data={data} />
    </div>
  );
};
export default LineChart;
