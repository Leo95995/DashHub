import { useDispatch, useSelector } from "react-redux";
import GenericSelect from "../../../../components/Select/Select";
import { setSelectedCryptoWidget } from "../../../../store/cryptoSlice";
import type { CryptoWidgets } from "../../types";
import { crypto_widgets } from "../Switcher/datas";
import FilterSection from "./filters-section";
import type { IFilters } from "./types";


const CryptoFilters: React.FC<IFilters> = ({ expanded = true }) => {
  const dispatch = useDispatch();
  const selectCryptoWidget = useSelector(
    (state: any) => state.crypto.selectedWidget
  );
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
