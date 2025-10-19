// Types
import type { CMEData } from "../../../../../../types/store/nasa";
import type { NasaWidgets } from "../../../../types";
import type { IWidgetContainer } from "../types";
// Components
import ApodWidget from "./nasa_apod";
import Cme_Widget from "./nasa_cme";
import NeoWsWidget from "./neows";


const WidgetContainer: React.FC<IWidgetContainer> = ({
  apodStatus,
  neoWStatus,
  cmeStatus,
  widgetSelected,
}) => {

  
  const renderWidgetSelected = (chosen: NasaWidgets = "Pic Of The Day") => {
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
