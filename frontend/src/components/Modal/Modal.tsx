// Icons 
import { Close } from "@mui/icons-material";
import { Modal } from "@mui/material";
//  Gener
import type { IGenericModal } from "./types";

const GenericModal: React.FC<IGenericModal> = ({
  status,
  children,
  title,
  closable = true
}) => {
  const { open, setOpen } = status;
  return (
    <Modal
      className="fixed inset-0 z-[9999]  max-h-screen flex items-center justify-center bg-black/50"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div
        className={` bg-slate-100 border-gray-200 max-h-200  dark:bg-slate-700 mt-10 text-black dark:text-white  transition-all w-80 md:w-120
        }  rounded-lg shadow-lg`}
      >
        <div className="flex justify-between items-center p-2 border-b dark:border-gray-600 border-gray-200">
          {title && <h2 className="font-semibold">{title}</h2>}
         {closable && <button
            className="cursor-pointer border border-red-500 hover:bg-red-100 transition-all duration-100 rounded-md"
            onClick={() => setOpen(false)}
          >
            <Close className="text-red-500" style={{height:'18px'}}/>
          </button>}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </Modal>
  );
};

export default GenericModal;
