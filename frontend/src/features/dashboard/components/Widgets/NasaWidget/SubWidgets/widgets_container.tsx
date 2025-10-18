// Interfaces
import type {
  INeoWsData,
  ItemStatus,
} from "../../../../../../store/interfaces/interfaces";
import type { IApodWidget } from "./nasa_apod";

import ApodWidget from "./nasa_apod";
import NeoWsWidget from "./neows";
import type { NasaWidgets } from "../../../widgetSwitcher/types";
import type { CMEData } from "../../../../../../store/interfaces/interfaces";
import Cme_Widget from "./nasa_cme";

interface IWidgetContainer {
  apodStatus: IApodWidget;
  neoWStatus: ItemStatus<INeoWsData[]>;
  cmeStatus: ItemStatus<CMEData>;
  widgetSelected: NasaWidgets;
}

const WidgetContainer: React.FC<IWidgetContainer> = ({
  apodStatus,
  neoWStatus,
  cmeStatus,
  widgetSelected,
}) => {


  // Render Logic
  const renderWidgetSelected = (chosen: NasaWidgets = "Pic Of The Day") => {
    console.log('he keeps rendering');
    
    switch (chosen) {
      case "Pic Of The Day":
        return renderApod();
      case "Near Earth Object":
        return renderNeoWs();
      case "CME":
        return renderCmeWidget();
    }
  };

  const renderApod = () => {
    return (
      <ApodWidget
        data={apodStatus.data}
        loading={apodStatus.loading}
        error={apodStatus.error}
      />
    );
  };

  const renderNeoWs = () => {
    return (
      <NeoWsWidget
        data={neoWStatus.data}
        loading={neoWStatus.loading}
        error={neoWStatus.error}
      />
    );
  };

  const renderCmeWidget = () => {
    return (
      <Cme_Widget
        cme_data={cmeStatus?.data as CMEData[]}
        loading={cmeStatus.loading}
        error={cmeStatus.error}
      />
    );
  };

  return <>{renderWidgetSelected(widgetSelected)}</>;
};

export default WidgetContainer;
