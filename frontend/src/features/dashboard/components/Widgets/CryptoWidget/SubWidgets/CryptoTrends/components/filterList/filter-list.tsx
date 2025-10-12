import { Close } from "@mui/icons-material";

interface IFilterList {
  filters: string[];
  onClick: (val: string) => void;
  applyFilters: () => void;
}

const FilterList: React.FC<IFilterList> = ({ filters, onClick, applyFilters }) => {
  return (
    <div className="absolute left-0 top-12 w-full flex flex-wrap gap-2 p-3 max-w-fit rounded-md">
      <div className="flex overflow-x-scroll w-70 sm:w-80 md:w-100 py-2 gap-1 flex-1 max-w-fit">
      {filters?.map((id: string) => (
        <span
          key={id}
          className="flex items-center gap-1 text-xs px-3 py-1 rounded-2xl border text-nowrap border-gray-700 bg-gray-800/80 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 text-white shadow-sm transition-all duration-200"
        >
          {id}
          <button
            className="flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={() => onClick(id)}
          >
            <Close
              className="text-gray-400 hover:text-white transition-colors duration-200"
              style={{ fontSize: "12px" }}
            />
          </button>
        </span>
      ))}
      </div>
      <div className="flex-0.2 items-center flex">
      <button
        onClick={applyFilters}
        className="ml-1 px-4 py-1 rounded-2xl cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        Apply
      </button>
      </div>
    </div>
  );
};

export default FilterList;
