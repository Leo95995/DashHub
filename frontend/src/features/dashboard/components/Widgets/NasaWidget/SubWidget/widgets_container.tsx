import type {
  INeoWsData,
  NasaItemStatus,
  RoverDetails,

} from "../../../../../../store/interfaces/interfaces";
import type { IApodWidget } from "./nasa_apod";

import ApodWidget from "./nasa_apod";
import NeoWsWidget from "./neows";
import MarsRoverWidget from "./mars-rover.tsx/mars_rover";
import type { NasaWidgets } from "../../../../../../store/interfaces/interfaces";

interface IWidgetContainer {
  apodStatus: IApodWidget;
  neoWStatus: NasaItemStatus<INeoWsData[]>;
  roverStatus: NasaItemStatus<RoverDetails[]>
  widgetSelected: NasaWidgets;
}

const WidgetContainer: React.FC<IWidgetContainer> = ({
  apodStatus,
  neoWStatus,
  roverStatus,
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
    return <MarsRoverWidget data={roverStatus.data} loading={roverStatus.loading} error={roverStatus.error} />;
  };

  return <>{renderWidgetSelected(widgetSelected)}</>;
};

export default WidgetContainer;
