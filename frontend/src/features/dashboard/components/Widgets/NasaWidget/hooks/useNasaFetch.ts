import { useEffect } from "react";
import {
  fetch_apod_data,
  fetch_cme_data,
  fetch_neows_data,
} from "../../../../../../store/nasaSlice";
import type { Dispatch } from "@reduxjs/toolkit";

// Fetch all the base data
export const useNasaFetcher = (dispatch: Dispatch<any>) => {
  const nasaFetchList = [fetch_apod_data, fetch_cme_data, fetch_neows_data];

  useEffect(() => {
    nasaFetchList.forEach((fetcher) => dispatch(fetcher()));
  }, []);
};
