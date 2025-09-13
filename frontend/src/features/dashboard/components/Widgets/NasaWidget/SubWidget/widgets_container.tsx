import type {
  INeoWsData,
  NasaItemStatus,
} from "../../../../../../store/interfaces/interfaces";
import type { IApodWidget } from "./nasa_apod";

import ApodWidget from "./nasa_apod";
import NeoWsWidget from "./neows";
import MarsRoverWidget from "./mars_rover";
import type { NasaWidgets } from "../../../../../../store/nasaSlice";

interface IWidgetContainer {
  apodStatus: IApodWidget;
  neoWStatus: NasaItemStatus<INeoWsData>;
  widgetSelected: NasaWidgets;
}

const WidgetContainer: React.FC<IWidgetContainer> = ({
  apodStatus,
  neoWStatus,
  widgetSelected,
}) => {



  // Render Logic 
  const renderWidgetSelected = (chosen: NasaWidgets = "apod") => {
    switch (chosen) {
      case "apod":
        return renderApod();
      case "neows":
        return renderNeoWs();
      case "rover":
        return renderMarsRover();
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

  const renderMarsRover = () => {
    return <MarsRoverWidget />;
  };

  return <>{renderWidgetSelected(widgetSelected)}</>;
};

export default WidgetContainer;
