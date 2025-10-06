import type React from "react";
import CryptoWidgetContainer from "./SubWidgets/CryptoWidgetContainers";
import Switcher from "../../widgetSwitcher/switcher";
import type { CryptoWidgets, WidgetTypes } from "../../widgetSwitcher/types";
import { useEffect, useState } from "react";
import { crypto_widgets } from "../../widgetSwitcher/datas";
//  CRYPTO DATA
import { useDispatch, useSelector } from "react-redux";
// Fetch datas and set them
import {
  fetchCryptoTrendings,
  fetchCryptoDetails,
  fetchTopGainers,
  setSelectedCryptoWidget,
} from "../../../../../store/cryptoSlice";
import type { ICryptoFilterData } from "../../../../../store/data/cryptoData";
import type { IGenericWidget } from "../../../interfaces";
import Tag from "../../../../../components/Tag";

const CryptoWidget: React.FC<IGenericWidget> = ({
  isEditMode,
  widgetId,
  onHide,
  handleDrop,
  setDraggedWidgetId,
}) => {
  // Dispatched datas
  const dispatch = useDispatch();
  const cryptoFilterData: ICryptoFilterData = useSelector(
    (state: any) => state.crypto.filterData as ICryptoFilterData
  );
  const { cryptoDetailFilters, cryptoTrendingFilters, genericFilters } =
    cryptoFilterData;
  const selectCryptoWidget = useSelector(
    (state: any) => state.crypto.selectedWidget
  );
  const [dragging, setDragging] = useState<boolean>(false);

  const handleCryptoWidgetChange = (widget: WidgetTypes) => {
    if (widget) {
      dispatch(setSelectedCryptoWidget(widget));
    }
  };

  const getDetailedFilters = async () => {
    await dispatch(fetchCryptoDetails(cryptoFilterData) as any);
  };

  const getCryptoTrends = async () => {
    await dispatch(fetchCryptoTrendings(cryptoFilterData) as any);
  };

  const getTopGainers = async () => {
    await dispatch(fetchTopGainers(cryptoFilterData) as any);
  };

 
  useEffect(() => {
    getTopGainers();
  }, [genericFilters]);

  useEffect(() => {
    getCryptoTrends();
  }, [cryptoTrendingFilters]);

  useEffect(() => {
    if (cryptoDetailFilters) {
      getDetailedFilters();
    }
  }, [cryptoDetailFilters]);

  return (
    <>
      <div
        draggable={isEditMode}
        onDragStart={() => {
          setDragging(true);
          setDraggedWidgetId(widgetId);
        }}
        onDragEnd={() => {
          setDragging(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(widgetId)}
        className={`col-span-1 h-120 hover:scale-105 transition-all rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-lg ${
          isEditMode && "ring-2 ring-blue-400 hover:scale-105 cursor-grab"
        }  ${
          dragging
            ? "scale-95 shadow-2xl cursor-grabbing ring-4 ring-blue-500"
            : ""
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Switcher
              changeSelectedWidget={handleCryptoWidgetChange}
              widgetSelected={selectCryptoWidget}
              widgetList={crypto_widgets}
            />
            {isEditMode && <Tag text="Edit Mode" /> }
          </div>
          <CryptoWidgetContainer widget={selectCryptoWidget as CryptoWidgets} />
        </div>
      </div>
    </>
  );
};

export default CryptoWidget;
