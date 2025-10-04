import type React from "react";
import type { RoverDetails } from "../../../../../../../store/interfaces/interfaces";

interface IRoverElement {
  data: RoverDetails;
}

const RoverElement: React.FC<IRoverElement> = ({ data }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold drop-shadow">Mars Rover</h3>
        <span className="text-sm opacity-80">{data?.earth_date}</span>
      </div>
      <div className="mb-3">
        <p className="text-sm">
          <span className="font-semibold">Name:</span> {data?.rover?.name}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Status:</span> {data?.rover?.status}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Landing:</span>{" "}
          {data?.rover?.landing_date}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Launch:</span>{" "}
          {data?.rover?.launch_date}
        </p>
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
          className="w-full max-w-200 self-center h-48 object-cover transition-transform duration-300 hover:scale-105 rounded-md"
        />
      </div>
    </div>
  );
};

export default RoverElement;
