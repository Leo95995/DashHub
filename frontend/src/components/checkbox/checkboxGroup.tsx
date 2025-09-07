import React from "react";
// Checkbox Group
import type { CheckboxGroupProps } from "./interfaces";
import CustomCheckbox from "./checkbox";


const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange, selectedList}) => {
  
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <CustomCheckbox selectedList={selectedList} onChange={onChange} option={option} />
      ))}
    </div>
  );
};

export default CheckboxGroup;
