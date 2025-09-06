import type React from "react";

const WeatherWidget: React.FC = () => {
  return (
    <>
      <div className="col-span-1 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold ">Weather Widget</h3>
        <p className="text-gray-400 mt-2"> Widget Meteo</p>
      </div>
    </>
  );
};

export default WeatherWidget;
