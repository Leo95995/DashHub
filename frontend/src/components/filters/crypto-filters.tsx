import GenericSelect from "../select";
import { useSelector,  useDispatch  } from "react-redux";
import { crypto_widgets} from "../../features/dashboard/components/widgetSwitcher/datas";
import type { CryptoWidgets } from "../../features/dashboard/components/widgetSwitcher/types";
import { setSelectedCryptoWidget } from "../../store/cryptoSlice";

interface ICryptoFilters {
  expanded: boolean;
}

const CryptoFilters: React.FC<ICryptoFilters> = ({ expanded }) => {
  const dispatch = useDispatch();
  const selectCryptoWidget = useSelector((state: any) => state.crypto.selectedWidget);

  const handleCryptoWidgetChange = (widget: CryptoWidgets) => {
    if (widget) {
      dispatch(setSelectedCryptoWidget(widget));
    }
  };

  return (
    <>
      <div
        className={`h-full transform transition-all duration-300  w-68
        ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
      >
        <span className="text-xl z-1 font-semibold mb-4 text-gray-900 dark:text-blue-300">
         Crypto Filters
        </span>

        <div className="flex flex-col  gap-2 w-full py-4">
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
      </div>
    </>
  );
};

export default CryptoFilters;
