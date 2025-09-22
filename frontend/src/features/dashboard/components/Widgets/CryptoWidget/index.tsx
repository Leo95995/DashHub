import type React from "react";
import CryptoWidgetContainer from "./SubWidgets/CryptoWidgetContainers";
import Switcher from "../../widgetSwitcher/switcher";
import type { CryptoWidgets, WidgetTypes } from "../../widgetSwitcher/types";
import { useEffect, useState } from "react";
import { crypto_widgets } from "../../widgetSwitcher/datas";
//  CRYPTO DATA
import { useDispatch } from "react-redux";
// Fetch datas and set them
import { fetchCryptoTrendings, fetchCryptoDetails, fetchTopGainers } from "../../../../../store/cryptoSlice";


const CryptoWidget: React.FC = () => {
  // Dispatched datas
  const dispatch = useDispatch();
  const [selectedWidget, setSelectedWidget] =
    useState<WidgetTypes>("Trending Cryptos");


  const getAllWidgetsData = async() =>{
    // await dispatch(fetchCryptoTrendings() as any)
    // await dispatch(fetchCryptoDetails() as any)
    // await dispatch(fetchTopGainers() as any)
  }


  useEffect(() => {
    // dispatch(fetchCryptoTrendings() as any);
    getAllWidgetsData()
  }, []);

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
