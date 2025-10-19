import type { ReactNode } from "react";

export interface IGenericModal {
  status: { open: boolean; setOpen: (status: boolean) => void };
  title?: string;
  children: ReactNode;
  width?: string;
  closable?: boolean
}