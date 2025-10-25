import { useSelector } from "react-redux";
import GenericSelect from "../../../../components/Select/Select";
import { setSelectedCryptoWidget } from "../../../../store/cryptoSlice";
import { crypto_widgets } from "../Switcher/datas";
import FilterSection from "./filters-section";
import type { IFilters } from "./types";
import { useWidgetSelector } from "../../hooks/UseWidgetSelector";
import { WidgetOrigin } from "../../hooks/types";

const CryptoFilters: React.FC<IFilters> = ({ expanded = true }) => {
  const selectCryptoWidget = useSelector(
    (state: any) => state.crypto.selectedWidget
  );

  const { currentSelection, setWidgetSelection } = useWidgetSelector({
    selector: () => selectCryptoWidget,
    actionCreator: setSelectedCryptoWidget,
    origin: WidgetOrigin.CRYPTO
  });

  const renderCryptoContent = () => {
    return (
      <div className="flex flex-col pb-4 gap-2 w-full">
        <label
          htmlFor="temperature"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Select Crypto Widget
        </label>
        <GenericSelect
          itemList={crypto_widgets}
          selectedList={currentSelection}
          onSelection={(e) => setWidgetSelection(e)}
          defaultText={selectCryptoWidget}
          placement="start"
        />
      </div>
    );
  };

  return (
    <>
      <FilterSection
        title={"CRYPTO"}
        defaultOpen={false}
        expanded={expanded as boolean}
      >
        {renderCryptoContent()}
      </FilterSection>
    </>
  );
};

export default CryptoFilters;
