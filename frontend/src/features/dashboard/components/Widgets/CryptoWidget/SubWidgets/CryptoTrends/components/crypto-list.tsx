import type React from "react";
import type { ICryptoTrendings } from "../../../../../../../../mappers/cryptoMapper";

interface ICryptoList {
  items: ICryptoTrendings;
}

const CryptoList: React.FC<ICryptoList> = ({ items }) => {
  return (
    <div className="flex w-full flex-wrap gap-2 ">
      {(Object.keys(items) as Array<keyof ICryptoTrendings>).map(
        (crypto_coin) => {
          const current = items[crypto_coin];
          const eurChangeColor =
            current?.eur_24h_change >= 0 ? "text-green-400" : "text-red-400";
          const usdChangeColor =
            current?.usd_24h_change >= 0 ? "text-green-400" : "text-red-400";

          return (
            <div
              key={crypto_coin}
              className="
               w-full max-w-sm
    bg-gradient-to-br from-gray-800 to-gray-700
    text-white p-4 rounded-2xl
    flex flex-col justify-between 
    flex-1
     hover:shadow-2xl
    transform  hover:scale-100
    transition-all duration-300
            "
            >
              <h3 className="text-sm font-bold uppercase tracking-wide mb-2">
                {crypto_coin}
              </h3>

              <div className="flex flex-col gap-1 text-xs">
                <p className="flex justify-between items-center">
                  <span className="font-semibold">EUR:</span>
                  <span>
                    {current.eur.toFixed(2)}{" "}
                    <span className={eurChangeColor}>
                      {current.eur_24h_change.toFixed(2)}%
                    </span>
                  </span>
                </p>

                <p className="flex justify-between items-center">
                  <span className="font-semibold">USD:</span>
                  <span>
                    {current.usd.toFixed(2)}{" "}
                    <span className={usdChangeColor}>
                      {current.usd_24h_change.toFixed(2)}%
                    </span>
                  </span>
                </p>
              </div>

              <div className="mt-3 text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                  24h Trend
                </span>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default CryptoList;
