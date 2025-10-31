// React - Redux
import type { UnknownAction } from "@reduxjs/toolkit";
import type { Dispatch } from "react";
// Types
import type { ICryptoFilterData } from "../../../../../types/store/crypto";
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

export interface ICryptoHook {
  cryptoFilterData: ICryptoFilterData;
  dispatch: Dispatch<UnknownAction>;
}
