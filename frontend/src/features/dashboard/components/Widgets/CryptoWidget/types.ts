import type { ICryptoTrendings } from "../../../../../types/store/crypto";

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

export interface IFilterList {
  filters: string[];
  onClick: (val: string) => void;
  applyFilters: () => void;
}

export interface ICryptoList {
  items: ICryptoTrendings;
}
