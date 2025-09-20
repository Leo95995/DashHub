
import {  configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./weatherSlice";
import { appSlice } from "./appSlice";
import { filterSlice } from "./filterSlice";
import { nasaSlice } from "./nasaSlice";
import { githubSlice } from "./githubSlice";
import { cryptoSlice } from "./cryptoSlice";

/**
 * Centralized redux store to handle all the useful status of our app
 */

export const appStore = configureStore({
  reducer: {
    app: appSlice.reducer,
    weather: weatherSlice.reducer,
    filters: filterSlice.reducer,
    nasa: nasaSlice.reducer,
    github: githubSlice.reducer,
    crypto: cryptoSlice.reducer
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

