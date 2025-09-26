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
} from "../../../../../store/cryptoSlice";
import type { ICryptoFilterData } from "../../../../../store/data/cryptoData";


const CryptoWidget: React.FC = () => {
  // Dispatched datas
  const dispatch = useDispatch();
  const [selectedWidget, setSelectedWidget] =
    useState<WidgetTypes>("Trending Cryptos");

  const cryptoFilterData : ICryptoFilterData= useSelector((state: any) => state.crypto.filterData as ICryptoFilterData);
  const { cryptoDetailFilters , cryptoTrendingFilters} = cryptoFilterData;

  /**
   * Per avere sempre i dati disponibili conviene fetcharsi tutti i dati i nun db e cam
   */

  const getDetailedFilters = async () => {
    await dispatch(fetchCryptoDetails(cryptoFilterData) as any);
  };

  const getCryptoTrends = async () => {
    await dispatch(fetchCryptoTrendings(cryptoFilterData) as any);
  };

  const getTopGainers = async() => {
    await dispatch(fetchTopGainers() as any);
  }

  /**
   * Must prepare data from backend next. now this work. add filters then abstract
   * all the logic. or i prepare an apply filter button
   */
  useEffect(() => {
    // dispatch(fetchCryptoTrendings() as any);
    // getAllWidgetsData()
    
    getTopGainers()
  }, []);

  useEffect(()=> {
     getCryptoTrends()
  }, [cryptoTrendingFilters])

  useEffect(() => {

    if (cryptoDetailFilters) {
      getDetailedFilters();
    }
  }, [cryptoDetailFilters]);

  return (
    <>
      <div className="col-span-1 hover:scale-105 transition-all rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <h3 className="text-xl font-semibold ">Crypto Widget</h3>
        <Switcher
          changeSelectedWidget={setSelectedWidget}
          widgetSelected={selectedWidget}
          widgetList={crypto_widgets}
        />
        <CryptoWidgetContainer widget={selectedWidget as CryptoWidgets} />
      </div>
    </>
  );
};

export default CryptoWidget;
