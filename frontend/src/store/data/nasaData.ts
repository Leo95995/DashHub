import type {
  PartialApod,
  ItemStatus,
  PartialNeoWs,
  CMEData,
} from "../interfaces/interfaces";
import type { NasaWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import nasaKey from "../../services/storage/nasa";

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

const cmeData: CMEData[] = [];

// Cme status
const cmeStatus: ItemStatus<CMEData[]> = {
  data: cmeData,
  loading: false,
  error: null,
};

const widgetSelected: NasaWidgets =
  nasaKey.getSelectedWidget() ?? "Near Earth Object";

export const initialState = {
  apodStatus,
  neoWsStatus,
  widgetSelected,
  cmeStatus,
};
