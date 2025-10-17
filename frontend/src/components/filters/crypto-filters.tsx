import GenericSelect from "../select";
import { useSelector, useDispatch } from "react-redux";
import { crypto_widgets } from "../../features/dashboard/components/widgetSwitcher/datas";
import type { CryptoWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import { setSelectedCryptoWidget } from "../../store/cryptoSlice";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import FilterSection from "./filters-section";

interface ICryptoFilters {
  expanded: boolean;
}

const CryptoFilters: React.FC<ICryptoFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const selectCryptoWidget = useSelector(
    (state: any) => state.crypto.selectedWidget
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCryptoWidgetChange = (widget: CryptoWidgets) => {
    if (widget) {
      dispatch(setSelectedCryptoWidget(widget));
    }
  };

  const renderCryptoContent = () => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="temperature"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Select Crypto Widget
        </label>
        <GenericSelect
          itemList={crypto_widgets}
          selectedList={selectCryptoWidget}
          onSelection={(e) => handleCryptoWidgetChange(e)}
          defaultText={selectCryptoWidget}
          placement="start"
        />
      </div>
    );
  };

  return (
    <>
      <FilterSection
        title={"Crypto Filters"}
        defaultOpen={false}
        expanded={expanded}
      >
       {renderCryptoContent()}
      </FilterSection>
    </>
  );
};

export default CryptoFilters;
