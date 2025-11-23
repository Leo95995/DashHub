import type { ICheckbox } from "./types";

const CustomCheckbox: React.FC<ICheckbox> = ({ option, onChange, selectedList, testId }) => {
  const selected = selectedList[option.value] ?? false;

  return (
    <label
      htmlFor={option.value}
      data-testid={testId?.trim()}
      className="flex items-center gap-3 cursor-pointer border-transparent  border-b-2 select-none hover:brightness-120 hover:font-medium"
    >
      <input
        id={option.value}
        type="checkbox"
        value={option.value}
        checked={selected}
        onChange={() => onChange?.(option.value as any, !selected as any)}
        className="peer hidden"
      />
      <div
        className={`
          w-5 h-5 flex-shrink-0 rounded-md border-2 border-gray-300 dark:border-gray-600
          flex items-center justify-center
          transition-colors duration-200
          peer-checked:bg-blue-500 peer-checked:border-blue-500
          peer-focus:ring-2 peer-focus:ring-blue-400 hover:bg-blue-800
        `}
      >
        {selected && (
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
    </label>
  );
};

export default CustomCheckbox;
