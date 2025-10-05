import { Close } from "@mui/icons-material";
import { CircleCheck } from "lucide-react";
import React, { useState } from "react";

interface IGenericSelect<T> {
  itemList: Array<T> | T;
  selectedList: Array<T>;
  onSelection: (value: any) => void;
  defaultText: string;
  placement?: 'start' | 'end' | 'center'
  padding?: string
  minHeigth?: string
  closeBtnPlacement?: string
}

/**
 * Whenever i pass a generic is necessary if its single to pass a ,
 */

const GenericSelect: React.FC<IGenericSelect<any>> = ({
  itemList,
  selectedList,
  onSelection,
  defaultText,
  placement = 'end',
  padding = 'p-0', // if not specified set padding to 0
  minHeigth
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
    <div className={`flex justify-${placement} z-20 w-full ${minHeigth} relative h-full ${padding} `}>
      {isOpen && (
        <button
        onClick={() => setIsOpen(false)}
        className={`absolute top-0 right-10 cursor-pointer z-20 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition-colors`}
        aria-label="Chiudi dropdown"
        >
          <Close />
        </button>
      )}
      <ul
        className={`absolute z-[9999] rounded-lg border border-gray-300 bg-white text-gray-700 shadow-md overflow-auto transition-max-h duration-300 ${
          isOpen
            ? "max-h-56 w-48"
            : "h-10 flex cursor-pointer hover:bg-blue-300  w-40"
        }`}
      >
        {isOpen ? (
          itemList?.map((option: string) => (
            <li
              key={option}
              onClick={() => onSelection(option)}
              className={`
                z-20
                px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 
                cursor-pointer 
                hover:bg-blue-300 transition-colors 
                flex justify-between items-center 
                text-sm sm:text-base md:text-lg
                ${
                  selectedList?.includes(option)
                    ? "text-amber-500 font-medium"
                    : ""
                }
              `}
            >
              <span className="truncate">{option}</span>
              {selectedList?.includes(option) && (
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
            <span className="p-2 w-full z-20" onClick={() => setIsOpen(true)}>
              {defaultText}
            </span>
          </>
        )}
      </ul>
    </div>
    </>
  );
};

export default GenericSelect;
