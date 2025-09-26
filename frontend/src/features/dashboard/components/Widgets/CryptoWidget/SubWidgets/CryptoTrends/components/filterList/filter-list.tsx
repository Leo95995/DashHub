import { Close } from "@mui/icons-material";

interface IFilterList {
  filters: string[];
  onClick: (val: string) => void;
}

const FilterList: React.FC<IFilterList> = ({ filters, onClick }) => {
  return (
    <div className="py-2 absolute left-0 rounded-md overflow-scroll text-nowrap flex gap-2 w-full  top-12">
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
    </div>
  );
};

export default FilterList;
