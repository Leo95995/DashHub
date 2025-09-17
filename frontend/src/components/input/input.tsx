import * as React from "react";

import Input from "@mui/material/Input";

const ariaLabel = { "aria-label": "description" };

const InputSearch: React.FC = () => {
  return (
    <>
      <Input placeholder="Placeholder" disabled inputProps={ariaLabel} />
    </>
  );
};


export default InputSearch