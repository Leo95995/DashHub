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

const CryptoWidget: React.FC<IGenericWidget> = ({ isEditMode }) => {
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

  /**
   * Must prepare data from backend next. now this work. add filters then abstract
   * all the logic. or i prepare an apply filter button
   */
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
      <div className="col-span-1 hover:scale-105 transition-all rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <h3 className="text-xl font-semibold ">Crypto Widget</h3>
        <div className="flex flex-col py-4 gap-4">
          <div className="flex justify-between">
         
          <Switcher
            changeSelectedWidget={handleCryptoWidgetChange}
            widgetSelected={selectCryptoWidget}
            widgetList={crypto_widgets}
          />
           {isEditMode ? <span>Edit Mode</span> : <span>No edit mode</span>}
          </div>
          <CryptoWidgetContainer widget={selectCryptoWidget as CryptoWidgets} />
        </div>
      </div>
    </>
  );
};

export default CryptoWidget;
