import type { NasaWidgets } from "../../features/dashboard/types";
import nasaKey from "../../services/storage/nasa";
import type { ItemStatus } from "../../types/common/status";
import type { PartialApod, PartialNeoWs, CMEData } from "../../types/store/nasa";

const nasa_apod_data: PartialApod = {};
const apodStatus: ItemStatus<PartialApod> = {
  data: nasa_apod_data,
  loading: false,
  error: null,
  fullScreenImage: { url: null, isFullScreen: false } as {
    url: null | string;
    isFullScreen: boolean;
  },
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
  nasaKey.getSelectedWidget() ?? "Pic Of The Day";

export const initialState = {
  apodStatus,
  neoWsStatus,
  widgetSelected,
  cmeStatus,
};
