import type { IFilters } from "./interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";


export type VisualMode = 'large' | 'small' | 'medium'


const initialFilterOptions: IFilters = {
  weatherFilters: {
    expanded: false,
  },
  cryptoFilters: {
    expanded: false,
  },
  socialFilters: {
    expanded: false,
  },
  kpiFilters: {
    expanded: false,
  },
  widgetVisibility: {
    weather: true,
    kpi: true,
    social: true,
    crypto: true,
  },
};

const initialState = {
  filters: initialFilterOptions,
  widgetLayout: {
    grid_col: {
        large: 3,
    }
  }
};

// Application slice.

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeWidgetVisibility: (
      state,
      action: {
        payload: {
          // Must specificy the type
          widget: keyof IFilters["widgetVisibility"];
          visibility: boolean;
        };
      }
    ) => {
      const { payload } = action;
      const { widget, visibility } = payload;
      state.filters.widgetVisibility[widget] = visibility;
    },
    setWidgetLayout: (state, action : {payload: { type: VisualMode, value: number}}) => {
        const { payload } = action
        const { type, value} = payload
        state.widgetLayout.grid_col.large = value
    }
  },
});

export const { changeWidgetVisibility, setWidgetLayout } = filterSlice.actions;
