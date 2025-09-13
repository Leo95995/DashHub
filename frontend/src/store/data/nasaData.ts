import type { PartialApod, NasaItemStatus, PartialNeoWs, PartialRover, NasaWidgets } from "../interfaces/interfaces";

const nasa_apod_data: PartialApod = {};
const apodStatus: NasaItemStatus<PartialApod> = {
  data: nasa_apod_data,
  loading: false,
  error: null,
};

const neows_data: PartialNeoWs = [];
const neoWsStatus: NasaItemStatus<PartialNeoWs> = {
  data: neows_data,
  loading: false,
  error: null,
};

const roverData: PartialRover = [];
const roverStatus: NasaItemStatus<PartialRover> = {
  data: roverData,
  loading: false,
  error: null,
};

const widgetSelected: NasaWidgets = "apod";


export const initialState = {
  apodStatus,
  neoWsStatus,
  widgetSelected,
  roverStatus,
};
