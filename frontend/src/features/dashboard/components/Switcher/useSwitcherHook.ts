import { useState } from "react";

export const useSwitcherHook = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleSelectWidget = () => {
    setOpen((prev) => !prev);
  };
  return { open, setOpen, handleSelectWidget };
};
