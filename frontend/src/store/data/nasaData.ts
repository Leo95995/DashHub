import type {
  PartialApod,
  ItemStatus,
  PartialNeoWs,
  PartialRover,
} from "../interfaces/interfaces";
import type { NasaWidgets } from "../../features/dashboard/components/widgetSwitcher/types";

const nasa_apod_data: PartialApod = {};
const apodStatus: ItemStatus<PartialApod> = {
  data: nasa_apod_data,
  loading: false,
  error: null,
};

const neows_data: PartialNeoWs = [];
const neoWsStatus: ItemStatus<PartialNeoWs> = {
  data: neows_data,
  loading: false,
  error: null,
};

const roverData: PartialRover = [];
const roverStatus: ItemStatus<PartialRover> = {
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
