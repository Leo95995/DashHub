import { useState } from "react";
import type {
  NasaItemStatus,
  INeoWsData,
} from "../../../../../../store/interfaces/interfaces";
import type { ArrowKey } from "../../../../../../interfaces/common/interfaces";

const NeoWsWidget: React.FC<NasaItemStatus<INeoWsData[]>> = ({
  data,
  loading,
  error,
}) => {
  const [selectedWidget, setSelectedWidget] = useState<{
    info: INeoWsData;
    index: number;
  }>({
    info: data[0] as INeoWsData,
    index: 0,
  });

  if (loading) {
    return <>Caricamento... </>;
  }
  if (error) {
    return <>{error}</>;
  }


  /**
   * It can of course be improved. and it should be.
   * 
   * @param currentIndex 
   * @param direction 
   */
  const changeWidget = (currentIndex: number, direction: ArrowKey) => {
    if (direction === "prev" && currentIndex > 1) {
      setSelectedWidget({
        info: data[selectedWidget.index - 1] as any,
        index: selectedWidget.index - 1,
      });
    } else if (direction === "next" && currentIndex < data.length) {
      setSelectedWidget({
        info: data[selectedWidget.index + 1] as any,
        index: selectedWidget.index + 1,
      });
    }
  };

  return (
    <>
      <div className="space-y-3 p-3 text-sm text-gray-800 dark:text-gray-200">
        <h2 className="font-bold text-2xl"> Near Earth Objects</h2>
        <div className="flex justify-between items-center gap-2">
          <b className="my-4 flex gap-2 items-center">
            Oggetti totali{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1 rounded-md">
              {data.length}
            </span>
          </b>
          <p>
            Oggetto selezionato <b>{selectedWidget.info.key + 1}</b> di{" "}
            <b>{data.length}</b>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Nome</span>
          <span className="truncate max-w-[10rem] text-right">
            {selectedWidget.info.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Diametro max</span>
          <span>{selectedWidget.info.estimated_diameter_max} km</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Velocità</span>
          <span>{selectedWidget.info.kilometers_per_hour} km/h</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Distanza (Lune)</span>
          <span>{selectedWidget.info.miss_distance_lunar}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Pericoloso</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              selectedWidget.info.is_potentially_hazardous
                ? "bg-red-500/20 text-red-600 dark:text-red-400 dark:bg-red-500/10"
                : "bg-green-500/20 text-green-700 dark:text-green-400 dark:bg-green-500/10"
            }`}
          >
            {selectedWidget.info.is_potentially_hazardous ? "Sì" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Data passaggio</span>
          <span>{selectedWidget.info.close_approach_date}</span>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => changeWidget(selectedWidget.info.key + 1, "prev")}
            className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition"
          >
            Precedente
          </button>
          <button
            onClick={() => changeWidget(selectedWidget.info.key + 1, "next")}
            className="px-4 py-2 cursor-pointer rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:from-purple-600 hover:to-pink-600 active:scale-95 transition"
          >
            Successivo
          </button>
        </div>
      </div>
    </>
  );
};

export default NeoWsWidget;
