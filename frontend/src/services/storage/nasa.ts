import type { NasaWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import { storage } from "./storage";

const NASA_KEY = "nasa";

const nasaKey = {
  getSelectedWidget: () => {
    return storage.getItem(`${NASA_KEY}_selected`);
  },
  setSelectedWidget: (selectedWidget: NasaWidgets) => {
    storage.setItem(`${NASA_KEY}_selected`, selectedWidget);
  },
};

export default nasaKey;
