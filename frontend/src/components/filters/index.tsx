import WeatherFilters from "./weather-filters";

const Filters: React.FC = () => {
  return (
    <>
      <div className="border h-full p-4">
        <b>Filtri</b>
        <div className="py-4">
          <WeatherFilters />
        </div>
      </div>
    </>
  );
};

export default Filters;
