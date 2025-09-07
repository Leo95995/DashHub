import type { ICheckbox } from "./interfaces";
const CustomCheckbox: React.FC<ICheckbox> = ({ option , onChange}) => {
  return (
    <>
      <label
        key={option.value}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <input
          type="checkbox"
          value={option.value}
          checked={selected.includes(option.value)}
          onChange={() => onChange(option.value, !vii)}
          className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
      </label>
    </>
  );
};

export default CustomCheckbox;
