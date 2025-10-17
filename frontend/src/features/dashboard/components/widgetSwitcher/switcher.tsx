import { useState } from "react";
// Components
import GenericModal from "../../../../components/modal/modal";
// Types & Interfaces
import type { WidgetSwitcher } from "./types";
import { CircleCheck } from "lucide-react";

const Switcher: React.FC<WidgetSwitcher> = ({
  changeSelectedWidget,
  widgetSelected,
  widgetList,
  switcherTitle,
  switcherButtonText,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleSelectWidget = () => {
    setOpen((prev) => !prev);
  };

  const renderChildren = () => {
    return (
      <ul className="px-4">
        {widgetList.map((e, index) => {
          return (
            <li key={e + index}>
              <button
                onClick={() => {
                  changeSelectedWidget(e);
                  handleSelectWidget();
                }}
                className="border-gray-200 dark:border-gray-600 border-b p-2 relative flex items-center justify-center w-full hover:border-transparent hover:rounded-sm  hover:from  hover:bg-gradient-to-r from-indigo-600  to-blue-950 hover:font-bold hover:text-white cursor-pointer"
              >
                {e}
                {widgetSelected === e && (
                  <>
                    <span
                      className="inline-flex items-center px-2 py-1 rounded-full absolute right-5 text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm gap-1"
                    >
                      <CircleCheck size={16} /> Selected
                    </span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <button
        onClick={handleSelectWidget}
        className="px-3 py-2 rounded-md text-white font-bold text-xs 
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
             shadow-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 
             active:scale-95 transition-all duration-300 cursor-pointer w-36"
      >
        {switcherButtonText ?? `Change widget`}
      </button>
      <GenericModal
        status={{
          open: open,
          setOpen: setOpen,
        }}
        title={switcherTitle ?? "Select the widget"}
      >
        <>{renderChildren()}</>
      </GenericModal>
    </>
  );
};

export default Switcher;
