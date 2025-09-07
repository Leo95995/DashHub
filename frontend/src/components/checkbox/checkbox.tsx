import type { ICheckbox } from "./interfaces";
const CustomCheckbox: React.FC<ICheckbox> = ({
  option,
  onChange,
  selectedList,
}) => {
  const isSelected = (value: string, list: any) => {
    for (const element in list) {
      if (value === element) {
        return list[element];
      }
    }
  };

  const selected = isSelected(option.value, selectedList);

  return (
    <>
      <label
        key={option.value}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <input
          type="checkbox"
          value={option.value}
          checked={selected}
          onChange={() =>
            onChange && onChange(option.value as any, !selected as any)
          }
          className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
      </label>
    </>
  );
};

export default CustomCheckbox;
