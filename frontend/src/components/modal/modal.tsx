import { Modal } from "@mui/material";
import type { ReactNode } from "react";

interface IGenericModal {
  status: { open: boolean; setOpen: (status: boolean) => void };
  title?: string;
  children: ReactNode;
}

const GenericModal: React.FC<IGenericModal> = ({ status, children, title }) => {
  const { open, setOpen } = status;
  return (
    <Modal
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="bg-white w-96 rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-2 border-b">
          {title && <h2 className="font-semibold">{title}</h2>}
          <button
            className="p-1 cursor-pointer border hover:bg-gray-200 rounded-md"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </Modal>
  );
};

export default GenericModal;
