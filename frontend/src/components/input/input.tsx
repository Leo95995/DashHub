import * as React from "react";

import Input from "@mui/material/Input";

const ariaLabel = { "aria-label": "description" };

interface InputSearchProps {
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: any)=> void
}

const InputSearch: React.FC<InputSearchProps> = ({ disabled =false, placeholder, onChange}) => {
  return (
    <>
      <Input
        placeholder={placeholder?? 'Placeholder'}
        disabled={disabled}
        inputProps={ariaLabel}
        aria-label=""
        className="w-100"
        onChange={(e)=> onChange(e.currentTarget.value)}
      />
    </>
  );
};

export default InputSearch;
