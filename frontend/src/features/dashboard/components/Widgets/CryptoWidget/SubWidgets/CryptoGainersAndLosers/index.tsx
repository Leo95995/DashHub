import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { ICryptoTopGainers } from "../../../../../../../mappers/cryptoMapper";

const CryptoGainersAndLosers: React.FC = () => {
  const topGainerData = useSelector(
    (state: any) => state.crypto.crypto_top_data
  );
  const { data, loading, error } = topGainerData;

  useEffect(() => {
    console.log(data, loading, error, 'PASS FROM THERE');
  }, []);

  if (loading) {
    return <>LOading</>;
  }

  if (error) {
    return <> Error </>;
  }
 

  if (!data || !Object.keys(data)?.length) {
    return <> No data to display</>;
  }

  return (
    <>
      <h2 className="text-xl font-medium pt-4">Top Gainers Crypto</h2>
      <div className="rounded-lg py-4 grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-110 overflow-scroll overflow-x-hidden">
        {data?.map((coin: ICryptoTopGainers) => {
          return (
            <>
              <div
                key={coin.id}
                className="flex items-center cursor-pointer hover:bg-gradient-to-r from-gray-50 to-gray-500 hover:scale-105 hover:text-black gap-3 p-2 border dark:border-gray-600 border-gray-200 rounded shadow-sm hover:shadow-md transition"
              >
                <img
                  src={coin.image}
                  alt={`Logo of ${coin.name}`}
                  className="w-8 h-8 rounded-full "
                  decoding="async"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="font-bold overflow-ellipsis line-clamp-1">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </span>
                  <span className="text-sm text-gray-500">
                    € {coin.price.toLocaleString()}
                  </span>
                </div>
                <div
                  className={`ml-auto font-semibold ${
                    coin.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {coin.change24h.toFixed(2)}%
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CryptoGainersAndLosers;
