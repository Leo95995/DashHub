
import { useSelector } from "react-redux";
import type { ItemStatus } from "../../../../../../../store/interfaces/interfaces";
import type { ICryptoTrendings } from "../../../../../../../mappers/cryptoMapper";
import { useEffect, useState } from "react";
const CryptoTrendings: React.FC = () => {
    const crypto_data= useSelector((state: any)=> state.crypto.cryptoData as  ItemStatus<ICryptoTrendings>)
    const { data, error, loading} = crypto_data  
    // Check if is an array

 
    const renderData = () => {
    if(loading){
        return <> Loading</>
    }
    
    if(error){
        return  <>{error as string}</>
    }
    
    if(!data){
        return <>No data found</>
    }

    return <> {renderTrendingCrypto()}</>
    }

    // Ui

    const renderTrendingCrypto = () => {

        return <>{Object.keys(data).map((crypto_coin)=> {
            console.log(crypto_coin);
            return <div className="flex flex-col">
                <ul>
                <h2>{crypto_coin}</h2>
                </ul>   
            </div>
        })}</>
    }

    
  
    return <>{renderData()}</>
};

export default CryptoTrendings