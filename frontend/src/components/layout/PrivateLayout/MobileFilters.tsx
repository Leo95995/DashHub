import GenericModal from "../../modal/modal";
// List of all filters
import Filters from "../../filters";
import { useState } from "react";
/**
 * Filters For mobile
 */
const MobileFilters: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleFlagger = () => {
    setOpen(true);
  };

  return (
    <div className="xl:hidden">
      <button
        onClick={handleFlagger}
        className="font-bold  text-white bg-gradient-to-br from-blue-300 shadow-md to-blue-600 cursor-pointer hover:scale-105 transition-all duration-100 p-2 rounded-md"
      >
        Modify Filters
      </button>
      <GenericModal
        status={{
          open: open,
          setOpen: setOpen,
        }}
        width="w-200"
        closable={true}
        children={
          <>
            <div
              className={`flex items-center w-full justify-center mb-6`}
            >
              <>
                <h2 className="text-2xl">
                  <b>Filters</b>
                </h2>
              </>
            </div>
            <Filters isMobile={true} />
          </>
        }
      />
    </div>
  );
};
export default MobileFilters;
