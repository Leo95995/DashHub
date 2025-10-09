import { useEffect, useState } from "react";
import type { RoverDetails } from "../../../../../../../../store/interfaces/interfaces";
import {
  chunkArray,
  pickRandomElement,
} from "../../../../../../../../utils/generic-utils";
import type { ArrowKey } from "../../../../../../../../interfaces/common/interfaces";


const useRoverNavigation = (data: RoverDetails[]) => {
  const [selectedChunk, setSelectedChunk] = useState<RoverDetails[]>([]);
  const [selectedRover, setSelectedRover] = useState<{
    data: RoverDetails;
    index: number;
  }>();


  useEffect(()=> {
    if(data.length){
    getRandomRover()}
  }, [data])


  const getRandomRover = () => {
    const chunkData = chunkArray<RoverDetails>(data as RoverDetails[], 5);
    const chunk = pickRandomElement(chunkData);
    setSelectedChunk(chunk);
    setSelectedRover({ data: chunk[0], index: 0 });
  };
  const changeRover = (currentIndex: number, direction: ArrowKey) => {
    if (!selectedRover) {
      return;
    }

    if (direction === "prev" && currentIndex > 1) {
      setSelectedRover({
        data: selectedChunk[selectedRover.index - 1],
        index: selectedRover?.index - 1,
      });
    } else if (direction === "next" && currentIndex < selectedChunk.length) {
      setSelectedRover({
        data: selectedChunk[selectedRover.index + 1],
        index: selectedRover?.index + 1,
      });
    }
  };

  return { selectedChunk, selectedRover, getRandomRover, changeRover };
};


export default useRoverNavigation;