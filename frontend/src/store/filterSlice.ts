import type { IFilters } from "./interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

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
        medium: 2,
        small: 1
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
    setWidgetLayout: (state, action)=> {
        const { payload } = action
        const {small, large, medium} = payload;
        state.widgetLayout.grid_col.large = large;
        state.widgetLayout.grid_col.medium = medium
        state.widgetLayout.grid_col.medium = small
    }
  },
});

export const { changeWidgetVisibility } = filterSlice.actions;
