import type { IChartData } from "../features/dashboard/components/Widgets/GithubWidget";
import type { GithubData } from "../features/dashboard/components/Widgets/GithubWidget/github-element";
import { generateDistinctColors } from "./generic-utils";

//  Reference for piechart data
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

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
