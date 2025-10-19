import React from "react";
// Checkbox Group
import type { CheckboxGroupProps } from "./types";
import CustomCheckbox from "./Checkbox";


const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange, selectedList}) => {
  
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <CustomCheckbox  selectedList={selectedList} key={option.label} onChange={onChange} option={option} />
      ))}
    </div>
  );
};

export default CheckboxGroup;
