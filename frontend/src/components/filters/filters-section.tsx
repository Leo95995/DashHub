// Filters for weathers
import type React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface IFilterSection {
  title: string;
  defaultOpen: boolean;
  children: React.ReactNode;
  expanded: boolean;
}

const FilterSection: React.FC<IFilterSection> = ({
  defaultOpen,
  title,
  children,
  expanded,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div
      className={`h-full transform transition-all duration-300 overflow-hidden border-b border-gray-300 dark:border-gray-600
    ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      <span
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${
          isOpen ? " dark:text-emerald-300" : "text-gray-600 dark:text-gray-200"
        } text-xl cursor-pointer font-semibold mb-4 flex items-center justify-between
  transition-colors duration-200
  hover:text-black dark:hover:text-emerald-200`} 
      >
        {title} {!isOpen ? <ChevronUp /> : <ChevronDown />}
      </span>

      <div
        className={`transition-all duration-200 overflow-hidden
          ${isOpen ? "max-h-fit py-4 opacity-100" : "max-h-0 py-0 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterSection;
