// store.ts

import {  configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./weatherSlice";
import { appSlice } from "./appSlice";
import { filterSlice } from "./filterSlice";

// Actually im not really using userdata. 



export const appStore = configureStore({
  reducer: {
    app: appSlice.reducer,
    weather: weatherSlice.reducer,
    filters: filterSlice.reducer
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

