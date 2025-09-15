import { useState } from "react";

import GenericModal from "../../../../components/modal/modal";
import type { WidgetSwitcher } from "./types";

const Switcher: React.FC<WidgetSwitcher> = ({
  changeSelectedWidget,
  widgetList,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSelectWidget = () => {
    setOpen((prev) => !prev);
  };

  const renderChildren = () => {
    return (
      <ul>
        <>
          {widgetList.map((e) => {
            return (
              <li>
                <>
                  <button
                    onClick={() => {
                      changeSelectedWidget(e);
                      handleSelectWidget();
                    }}
                    className="border-gray-200 border-b p-2 w-full hover:bg-gray-200 cursor-pointer"
                  >
                    {e}
                  </button>
                </>
              </li>
            );
          })}
        </>
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
             active:scale-95 transition-all duration-300 cursor-pointer"
      >
        Change widget
      </button>
      <GenericModal
        status={{
          open: open,
          setOpen: setOpen,
        }}
        title="Select the current nasa widget"
      >
        <>{renderChildren()}</>
      </GenericModal>
    </>
  );
};

export default Switcher;
