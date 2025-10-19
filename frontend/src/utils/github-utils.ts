import type { GithubData, IChartData } from "../features/dashboard/components/Widgets/GithubWidget/types";
import { generateDistinctColors } from "./generic-utils";

// Function used to generate stats showable to piechart
export const populateGithubPiechart = (
  object: GithubData["object"],
  label: string
) => {
  const result: IChartData<number> = {
    labels: [],
    datasets: [{ data: [], label: "", backgroundColor: [], borderColor: [] }],
    borderWidth: 1,
  };
  result.datasets[0].label = label;

  for (const key in object) {
    result.labels.push(key);
    const keyz = key as keyof GithubData["object"];
    result.datasets[0].data.push(object[keyz]);
  }
  const colors = generateDistinctColors(result.labels.length);
  result.datasets[0].backgroundColor = colors;
  result.datasets[0].borderColor = colors;
  return { result };
};
