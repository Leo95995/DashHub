import { useState } from "react";

import GenericModal from "../../../../components/modal/modal";
import type { WidgetSwitcher } from "./types";

const Switcher: React.FC<WidgetSwitcher> = ({
  changeSelectedWidget,
  widgetList,
  switcherTitle,
  switcherButtonText,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSelectWidget = () => {
    setOpen((prev) => !prev);
  };


  // Pass in input a list of widget that return the selection value

  const renderChildren = () => {
    return (
      <ul className="px-4 ">
          {widgetList.map((e, index) => {
            return (
              <li key={e+index}>
                  <button
                    onClick={() => {
                      changeSelectedWidget(e);
                      handleSelectWidget();
                    }}
                    className="border-gray-200 border-b p-2 w-full hover:border-transparent hover:rounded-sm  hover:from  hover:bg-gradient-to-r from-indigo-600  to-blue-950 hover:font-bold hover:text-white cursor-pointer"
                  >
                    {e}
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
             active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {switcherButtonText ?? `Change widget`}
      </button>
      <GenericModal
        status={{
          open: open,
          setOpen: setOpen,
        }}
        title={ switcherTitle ?? "Select the widget"}
      >
        <>{renderChildren()}</>
      </GenericModal>
    </>
  );
};

export default Switcher;
