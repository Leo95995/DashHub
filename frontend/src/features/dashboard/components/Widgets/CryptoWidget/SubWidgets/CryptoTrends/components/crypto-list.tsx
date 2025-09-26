import type React from "react"
import type { ICryptoTrendings } from "../../../../../../../../mappers/cryptoMapper"
/**
 * render the lsit of crypto elements 
 */

interface ICryptoList { 
    items: ICryptoTrendings
}

const CryptoList: React.FC<ICryptoList> = ({items}) =>{

  
       return  <>
       {(Object.keys(items) as Array<keyof ICryptoTrendings>).map((crypto_coin) => {

            const current = items[crypto_coin];
            const eurChangeColor =
              current?.eur_24h_change >= 0 ? "text-green-500" : "text-red-500";
            const usdChangeColor =
              current?.usd_24h_change >= 0 ? "text-green-500" : "text-red-500";

            return   <div
                key={crypto_coin}
                className="bg-gray-700 text-white p-2 w-full max-w-82 rounded-md flex flex-col hover:bg-gray-600 transition-colors duration-200"
              >
                <h3 className="text-sm font-bold uppercase">{crypto_coin}</h3>
                <p className="text-xs ">
                  <span className="font-semibold">EUR: </span>{" "}
                  {current.eur.toFixed(2)}{" "}
                  <span className={eurChangeColor}>
                    {current.eur_24h_change.toFixed(2)}%
                  </span>
                </p>
                <p className="text-xs">
                  <span className="font-semibold">USD: </span>{" "}
                  {current.usd.toFixed(2)}{" "}
                  <span className={usdChangeColor}>
                    {current.usd_24h_change.toFixed(2)}%
                  </span>
                </p>
              </div>})}
              </>

}

export default CryptoList