import type {
  ICryptoTrendings,
  ICryptoDetails,
  ICryptoTopGainers,
} from "../types/store/crypto";

/**
 * Function who return a list of ids representing all the crypto currencies
 * available.
 * @params data any
 * @returns string[]
 */
const CryptoCurrenciesMapper = (data: any[]): string[] => {
  const currencyList: string[] = [];
  data.map((currency_details) => {
    currencyList.push(currency_details.id as string);
  });

  return currencyList as string[];
};

// Nothing goes mapped here.
const cryptoTrendingMapper = (
  data: ICryptoTrendings
): ICryptoTrendings | any => {
  return data as ICryptoTrendings;
};

// Crypto details mapper
const cryptoDetailsMapper = (data: any) => {
  return data["prices"] as ICryptoDetails;
};

// crypto top gainers
const cryptoTopGainersMapper = (data: any): ICryptoTopGainers[] => {
  const crypto_gain_arr: ICryptoTopGainers[] = [];

  data.map((coin: any) => {
    const coinData: ICryptoTopGainers = {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: coin.current_price,
      change24h: coin.price_change_24h,
      marketCap: coin.market_cap,
    };
    crypto_gain_arr.push(coinData);
  });

  return crypto_gain_arr as ICryptoTopGainers[];
};

export const CryptoMappers = {
  CryptoCurrenciesMapper,
  cryptoTrendingMapper,
  cryptoDetailsMapper,
  cryptoTopGainersMapper,
};
