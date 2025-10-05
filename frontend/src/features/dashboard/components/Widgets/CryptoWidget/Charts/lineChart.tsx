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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface ILineChartData {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
    }[];
  };
}

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
    <div className="w-full h-24 md:h-60">
      <Line options={defaultOptions} data={data} />
    </div>
  );
};
export default LineChart;
