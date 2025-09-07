import React, { useState } from "react";
// Checkbox Group
import type { CheckboxGroupProps } from "./interfaces";
import CustomCheckbox from "./checkbox";
import { useSelector } from "react-redux";

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);
    const filters = useSelector((state: any) => state.filters);
  


  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <CustomCheckbox onChange={onChange} option={option} />
      ))}
    </div>
  );
};

export default CheckboxGroup;
