import type React from "react";
import CryptoWidgetContainer from "./SubWidgets/CryptoWidgetContainers";
import Switcher from "../../Switcher/switcher";
import { crypto_widgets } from "../../Switcher/datas";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCryptoWidget } from "../../../../../store/cryptoSlice";
import type { ICryptoFilterData } from "../../../../../store/data/cryptoData";
import type { CryptoWidgets, IGenericWidget } from "../../../types";
import Tag from "../../../../../components/Tag/Tag";
// Hooks
import { useDragDrop } from "../../../../../hooks/useDragAndDrop";
import { useDetailedCryptoFilters } from "./hooks/useDetailedCryptoFilters";
import { useCryptoTrends } from "./hooks/useCryptoTrends";
import { useWidgetSelector } from "../../../hooks/UseWidgetSelector";
import { useCryptoTopGainers } from "./hooks/useCryptoTopGainers";

const CryptoWidget: React.FC<IGenericWidget> = ({
  isEditMode,
  widgetId,
  handleDrop,
  setDraggedWidgetId,
}) => {
  const dispatch = useDispatch();
  const cryptoFilterData: ICryptoFilterData = useSelector(
    (state: any) => state.crypto.filterData as ICryptoFilterData
  );

  const selectCryptoWidget = useSelector(
    (state: any) => state.crypto.selectedWidget
  );

  const cryptoFiltersHooks = [
    useDetailedCryptoFilters,
    useCryptoTrends,
    useCryptoTopGainers,
  ];

  // Execute all the crypto filters hooks
  cryptoFiltersHooks.forEach((hook) => hook({ cryptoFilterData, dispatch }));

  const { currentSelection, setWidgetSelection } = useWidgetSelector({
    selector: () => selectCryptoWidget,
    actionCreator: setSelectedCryptoWidget,
  });

  const {
    dragging,
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
  } = useDragDrop({ widgetId, handleDrop, setDraggedWidgetId });

  return (
    <>
      <div
        draggable={isEditMode}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        className={`col-span-1 h-120 hover:scale-105 transition-all rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-lg ${
          isEditMode && "ring-2 ring-blue-400 hover:scale-105 cursor-grab"
        }  ${
          dragging
            ? "scale-95 shadow-2xl cursor-grabbing ring-4 ring-blue-500"
            : ""
        }`}
      >
        <div className="flex flex-col gap-4 h-full ">
          <div className="flex justify-between">
            <Switcher
              changeSelectedWidget={setWidgetSelection}
              widgetSelected={currentSelection}
              widgetList={crypto_widgets}
            />
            {isEditMode && <Tag text="Edit Mode" />}
          </div>
          <CryptoWidgetContainer widget={currentSelection as CryptoWidgets} />
        </div>
      </div>
    </>
  );
};

export default CryptoWidget;
