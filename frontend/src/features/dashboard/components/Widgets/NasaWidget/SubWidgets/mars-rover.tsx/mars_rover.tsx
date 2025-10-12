import type {
  ItemStatus,
} from "../../../../../../../store/interfaces/interfaces";
import RoverElement from "./mars-rover-element";
import { Infinity } from "lucide-react";
import useRoverNavigation from "./hook/useRoverNavigation";
import LoaderWithMessage from "../../../../../../../components/loader/loaderAndText";
const MarsRoverWidget: React.FC<ItemStatus<any>> = ({
  data,
  loading,
  error,
}) => {
  const { selectedChunk, selectedRover, getRandomRover, changeRover } =
    useRoverNavigation(data);

  if (!selectedRover) {
    return;
  }

  if (loading) {
    return <LoaderWithMessage text="Loading Mars Rover data"/>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      <div className="flex flex-col max-h-full overflow-scroll">
        <div className="flex justify-between py-2 items-center">
          <p>
            Oggetto selezionato <b>{(selectedRover?.index as number) + 1}</b> di{" "}
            <b>{selectedChunk?.length}</b>
          </p>
          <button
            className="px-3 py-1 cursor-pointer rounded-lg 
           bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300 
           text-gray-800 font-medium shadow-sm flex gap-2 items-center
           hover:from-gray-600 hover:via-gray-500 hover:to-gray-400
           active:scale-95 transition hover:text-white"
            onClick={() => getRandomRover()}
          >
            Casuale <Infinity />
          </button>
        </div>
        {selectedRover && <RoverElement data={selectedRover?.data} />}
        <div className="flex justify-center gap-4 ">
          <button
            onClick={() =>
              changeRover((selectedRover?.index + 1) as number, "prev")
            }
            className="px-4 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition"
          >
            Precedente
          </button>
          <button
            onClick={() =>
              changeRover((selectedRover?.index + 1) as number, "next")
            }
            className="px-4 py-2 cursor-pointer rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:from-purple-600 hover:to-pink-600 active:scale-95 transition"
          >
            Successivo
          </button>
        </div>
      </div>
    </>
  );
};

export default MarsRoverWidget;
