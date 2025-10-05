import type React from "react";
import type { RoverDetails } from "../../../../../../../store/interfaces/interfaces";

interface IRoverElement {
  data: RoverDetails;
}

const RoverElement: React.FC<IRoverElement> = ({ data }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold drop-shadow flex-1">Mars Rover</h3>
        <span className="text-sm opacity-80 flex-1">
          <div className="rounded-2xl w-fit px-2 cursor-pointer
           bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300 
           text-gray-900 font-medium shadow-sm flex gap-2 items-center
           hover:from-gray-600 hover:via-gray-500 hover:to-gray-400
           transition-all hover:text-white ">{data?.earth_date}</div></span>
      </div>
      <div className="mb-3 flex flex-col gap-2">
        <div className="flex">
        <p className="text-sm flex-1">
          <span className="font-semibold">Name:</span> {data?.rover?.name}
        </p>
        <p className="text-sm flex-1">
          <span className="font-semibold">Status:</span> {data?.rover?.status}
        </p>
        </div>
        <div className="flex">

        <p className="text-sm flex-1">
          <span className="font-semibold">Landing:</span>{" "}
          {data?.rover?.landing_date}
        </p>
        <p className="text-sm flex-1">
          <span className="font-semibold">Launch:</span>{" "}
          {data?.rover?.launch_date}
        </p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-sm">
          <span className="font-semibold">Camera:</span> {data?.camera?.full_name}{" "}
          ({data.camera.name})
        </p>
      </div>
      <div className="rounded-xl flex justify-center overflow-hidden mb-3 transition-all duration-300">
        <img
          src={data?.img_src}
          loading="lazy"
          decoding="async"
          alt={`Mars Rover ${data?.rover?.name} - ${data?.camera?.full_name}`}
          className="w-full max-w-200 self-center h-42 object-cover transition-transform duration-300 hover:scale-105 rounded-md"
        />
      </div>
    </div>
  );
};

export default RoverElement;
