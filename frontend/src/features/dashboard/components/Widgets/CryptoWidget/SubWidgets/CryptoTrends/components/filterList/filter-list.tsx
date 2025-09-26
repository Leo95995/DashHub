import { Close } from "@mui/icons-material";

interface IFilterList {
  filters: string[];
  onClick: (val: string) => void;
  applyFilters: ()=>void
}

const FilterList: React.FC<IFilterList> = ({ filters, onClick , applyFilters}) => {
  return (
    <div className="py-2 absolute left-0 rounded-md flex-wrap text-nowrap flex gap-2 w-full  top-12">
      {filters?.map((id: string) => (
        <span className="px-2 py-1 border hover:bg-gray-800 hover:text-white text-sm hover:filter flex items-center justify-center gap-1 rounded-2xl">
          {id}{" "}
          <button
            className="cursor-pointer hover:scale-105"
            onClick={() => onClick(id)}
          >
            <Close className="hover:scale-120" style={{ fontSize: "12px" }} />
          </button>
        </span>
      ))}
         <button onClick={applyFilters} className="border bg-gradient-to-r from-green-400 to-emerald-600 px-2 rounded-2xl hover:scale-105 cursor-pointer transition-all duration-100">
              Apply filters
            </button>
    </div>
  );
};

export default FilterList;
