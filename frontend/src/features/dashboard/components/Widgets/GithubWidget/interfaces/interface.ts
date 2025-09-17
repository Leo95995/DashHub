export interface GithubData {
  object: { [key: string]: number };
}
export interface IChartData<T> {
  labels: string[];
  datasets: [
    {
      label: string;
      data: T[];
      backgroundColor: string[];
      borderColor: string[];
    }
  ];

  borderWidth: number;
}

export type githubSteps = 1 | 2 | 'user-activity';
