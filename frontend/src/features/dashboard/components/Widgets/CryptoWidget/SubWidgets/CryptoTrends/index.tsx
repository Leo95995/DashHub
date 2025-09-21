import { useSelector } from "react-redux";
import type { ItemStatus } from "../../../../../../../store/interfaces/interfaces";
import type { ICryptoTrendings } from "../../../../../../../mappers/cryptoMapper";

const CryptoTrendings: React.FC = () => {
  const crypto_data = useSelector(
    (state: any) => state.crypto.cryptoData as ItemStatus<ICryptoTrendings>
  );
  const { data, error, loading } = crypto_data;
  // Check if is an array

  const renderData = () => {
    if (loading) {
      return <> Loading</>;
    }

    if (error) {
      return <>{error as string}</>;
    }

    if (!data) {
      return <>No data found</>;
    }

    return <> {renderTrendingCrypto()}</>;
  };

  // Ui

const renderTrendingCrypto = () => {
  if (!data || Array.isArray(data)) return null;

  return (
    <div className="flex flex-wrap gap-2 py-4 justify-center">
      {(Object.keys(data) as Array<keyof ICryptoTrendings>).map((crypto_coin) => {
        const current = data[crypto_coin];
        const eurChangeColor =
          current?.eur_24h_change >= 0 ? "text-green-500" : "text-red-500";
        const usdChangeColor =
          current?.usd_24h_change >= 0 ? "text-green-500" : "text-red-500";

        return (
          <div
            key={crypto_coin}
            className="bg-gray-700 text-white p-2 w-full max-w-82 rounded-md flex flex-col hover:bg-gray-600 transition-colors duration-200"
          >
            <h3 className="text-sm font-bold uppercase">{crypto_coin}</h3>
            <p className="text-xs ">
              <span className="font-semibold">EUR: </span> {current.eur.toFixed(2)}{" "}
              <span className={eurChangeColor}>{current.eur_24h_change.toFixed(2)}%</span>
            </p>
            <p className="text-xs">
               <span className="font-semibold">USD: </span> {current.usd.toFixed(2)}{" "}
              <span className={usdChangeColor}>{current.usd_24h_change.toFixed(2)}%</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};


  return <>{renderData()}</>;
};

export default CryptoTrendings;
