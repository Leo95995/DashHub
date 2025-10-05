import { Loader2 } from "lucide-react";
import * as React from "react";

interface InputSearchProps {
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: any) => void;
  isLoading: boolean;
  width?: string;
}

const InputSearch: React.FC<InputSearchProps> = ({
  disabled = false,
  placeholder,
  onChange,
  isLoading,
  width,
}) => {


  return (
    <>
      <div className="flex items-center relative">
        <input
          placeholder={placeholder ?? "Placeholder"}
          disabled={disabled || isLoading}
          aria-label=""
          onChange={(e) => onChange(e.currentTarget.value)}
          className={`${width ? width : `w-60 md:w-100`}px-3 py-2
border-b-2
bg-transparent
text-gray-900
placeholder-gray-400
focus:outline-none
focus:border-indigo-500
focus:ring-0
dark:text-amber-50
dark:border-gray-600
disabled:opacity-30
  `}
        />
        {isLoading && (
          <Loader2 className="animate-spin text-gray-300 absolute dark:text-gray-400 right-0" />
        )}
      </div>
    </>
  );
};

export default InputSearch;
