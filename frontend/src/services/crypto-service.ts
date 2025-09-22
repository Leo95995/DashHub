import { CryptoMappers } from "../mappers/cryptoMapper";

const CryptoService = () => {
  const { cryptoTrendingMapper, cryptoDetailsMapper, cryptoTopGainersMapper, CryptoCurrenciesMapper } = CryptoMappers;

  /**
   * get all currencies for the cryptos to be selected. so show them as values to select. we naap only the id.
   */

  const getAllCryptoCurrencies = async () => {
    const currenciesListUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur`;
    try {
      const res = await fetch(currenciesListUrl, { method: "GET" });
      const data = await res.json();
      const status = res.status;

      // map datas to
      const currencyList = CryptoCurrenciesMapper(data);
      if (data && status === 200) {
        return {
          currencyList: currencyList,
          status: status,
          error: false,
        };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  const getAllCryptosTrend = async () => {
    /**
     *  params to pass -> ids, currencies, time for change?
     * the we refine each one
     */

    const cryptos_url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd,eur&include_24hr_change=true`;
    try {
      const res = await fetch(cryptos_url, { method: "GET" });
      const data = await res.json();
      const status = res.status;

      // map datas to
      const mappedTrendingCryptos = cryptoTrendingMapper(data);
      if (data && status === 200) {
        return {
          trending_cryptos: mappedTrendingCryptos,
          status: status,
          error: false,
        };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  //  Get crypto details

  const getCryptoDetails = async () => {
    /**
     * Passing dinamically
     * coint type, currency type and days types.
     */
    const crypto_details_url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=1`;
    try {
      const res = await fetch(crypto_details_url, { method: "GET" });
      const data = await res.json();
      const status = res.status;
      console.log(data);
      // map datas to
      const mappedCryptoDetails = cryptoDetailsMapper(data);
      if (data && status === 200) {
        return {
          crypto_details: mappedCryptoDetails,
          status: status,
          error: false,
        };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  // get top gainer and losers

  const getTopGainersAndLosers = async () => {
    const crypto_top_gainer_url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&price_change_percentage=24h
`;
    try {
      const res = await fetch(crypto_top_gainer_url, { method: "GET" });
      const data = await res.json();
      const status = res.status;

      // map datas to return a mapped object from the data gotten
      const mappedTopGainers = cryptoTopGainersMapper(data);
      if (data && status === 200) {
        return { topGainers: mappedTopGainers, status: status, error: false };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  return {
    getAllCryptoCurrencies,
    getAllCryptosTrend,
    getCryptoDetails,
    getTopGainersAndLosers,
  };
};

export default CryptoService;

