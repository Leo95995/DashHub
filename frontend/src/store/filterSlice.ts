import type { ScreenMode } from "../interfaces/common/interfaces";
import type { IFilters } from "./interfaces/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type VisualMode = 'large' | 'small' | 'medium'


const initialFilterOptions: IFilters = {
  weatherFilters: {
    expanded: false,
  },
  cryptoFilters: {
    expanded: false,
  },
  nasaFilters: {
    expanded: false,
  },
  githubFilters: {
    expanded: false,
  },
  widgetVisibility: {
    weather: true,
    github: true,
    nasa: true,
    crypto: true,
  },
};

const initialState = {
  filters: initialFilterOptions,
  widgetLayout: {
    grid_col: {
        large: 2,
        medium: 2,
        small: 1
    },
    layoutMode:  ""
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
        if(type == 'large'){
          state.widgetLayout.grid_col.large = value
        }else if(type === 'medium'){
          state.widgetLayout.grid_col.medium = value
        }else {
          state.widgetLayout.grid_col.small = value
        }
    },
    setLayoutMode(state, action: PayloadAction<ScreenMode>){
      state.widgetLayout.layoutMode = action.payload
    }
  },
});

export const { changeWidgetVisibility, setWidgetLayout, setLayoutMode } = filterSlice.actions;
