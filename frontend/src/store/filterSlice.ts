import type { ScreenMode } from "../types/common/generic";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import DashboardStorage from "../services/storage/dashboard";
import type { IFilters } from "../types/common/filters";
const { filters } = DashboardStorage;

export type VisualMode = "large" | "small" | "medium";

export interface IWidgetLayout {
  grid_col: {
    large: 1 | 2 | 3;
    medium: 1 | 2;
    small: 1;
  };
  layoutMode: string;
}

const initialFilterOptions: IFilters = {
  widgetVisibility: {
    weather: true,
    github: true,
    nasa: true,
    crypto: true,
  },
};

const getFilterOptions = (): IFilters => {
  const visibility = filters.getWidgetVisibility()
  const finalFiltersOptions: IFilters = {
    widgetVisibility: visibility
  };

  return finalFiltersOptions;
};

const getWidgetLayout = () => {
  const storageLayout = filters.getWidgetLayout()
  return storageLayout;
};

const widgetLayout = getWidgetLayout();
const filterOptions = getFilterOptions();

const initialState = {
  filters: filterOptions.widgetVisibility ? filterOptions : initialFilterOptions,
  widgetLayout: widgetLayout ?? {
    grid_col: {
      large: 2,
      medium: 2,
      small: 1,
    },
    layoutMode: "",
  },
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
      filters.saveWidgetVisibility(state.filters.widgetVisibility)
    },
    setWidgetLayout: (
      state,
      action: { payload: { type: VisualMode; value: number } }
    ) => {
      const { payload } = action;
      const { type, value } = payload;
      if (type == "large") {
        state.widgetLayout.grid_col.large = value;
      } else if (type === "medium") {
        state.widgetLayout.grid_col.medium = value;
      } else {
        state.widgetLayout.grid_col.small = value;
      }

      filters.saveWidgetLayout(state.widgetLayout)

    },
    setLayoutMode(state, action: PayloadAction<ScreenMode>) {
      state.widgetLayout.layoutMode = action.payload;
    },
  },
});

export const { changeWidgetVisibility, setWidgetLayout, setLayoutMode } =
  filterSlice.actions;
