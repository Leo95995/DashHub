import { Close } from "@mui/icons-material";
import { CircleCheck } from "lucide-react";
import React, { useState } from "react";

interface IGenericSelect<T> {
  itemList: Array<T>;
  onSelection: (value: any) => void;
  defaultText: string;
  multipleSelection: boolean;
}

/**
 * Whenever i pass a generic is necessary if its single to pass a ,
 */

const GenericSelect: React.FC<IGenericSelect<any>> = ({
  itemList,
  onSelection,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-end pb-6 w-full relative h-28 px-12">
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-0 right-5 cursor-pointer z-20 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition-colors"
          aria-label="Chiudi dropdown"
        >
          <Close />
        </button>
      )}
      <ul
        className={`absolute z-20 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-md overflow-auto transition-max-h duration-300 ${
          isOpen
            ? "max-h-56 w-48"
            : "h-10 flex cursor-pointer hover:bg-blue-300 overflow-hidden w-30"
        }`}
      >
        {isOpen ? (
          itemList?.map((option: string) => (
            <li
              key={option}
              onClick={() => onSelection(option)}
              className={`
                px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 
                cursor-pointer 
                hover:bg-blue-300 transition-colors 
                flex justify-between items-center 
                text-sm sm:text-base md:text-lg
                ${
                  itemList?.includes(option) ? "text-amber-500 font-medium" : ""
                }
              `}
            >
              <span className="truncate">{option}</span>
              {itemList?.includes(option) && (
                <span
                  className="
                    inline-flex items-center 
                    px-1.5 py-0.5 sm:px-2 sm:py-0.5 
                    rounded-full 
                    text-[10px] sm:text-xs md:text-sm 
                    font-semibold
                    bg-green-500 text-white shadow-sm gap-1
                  "
                >
                  <CircleCheck size={14} /> Selected
                </span>
              )}
            </li>
          ))
        ) : (
          <>
            <span className="p-2" onClick={() => setIsOpen(true)}>
              {text}
            </span>
          </>
        )}
      </ul>
    </div>
  );
};

export default GenericSelect;
