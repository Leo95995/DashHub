// Mappers
import { CryptoMappers } from "../../mappers/cryptoMapper";
// Types
import type { ICryptoFilterData } from "../../types/store/crypto";
import { services_url } from "../../utils/environment";

const CryptoService = () => {
  const {
    cryptoTrendingMapper,
    cryptoDetailsMapper,
    cryptoTopGainersMapper,
    CryptoCurrenciesMapper,
  } = CryptoMappers;

  /**
   * Get the list of all currencies
   * @returns
   */
  const getAllCryptoCurrencies = async () => {
    const currenciesListUrl = `${services_url.crypto}/currencies`;
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

  const getAllCryptosTrend = async (
    filters: Pick<ICryptoFilterData, "cryptoTrendingFilters">
  ) => {
    const idList = filters.cryptoTrendingFilters.ids;

    let filterList = "";
    idList.map((filter, index) =>
      index !== idList.length - 1
        ? (filterList += `${filter},` as string)
        : (filterList += filter as string)
    );

    const cryptos_url = `${services_url.crypto}/trending?coinIds=${filterList}`;
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

  const getCryptoDetails = async (
    filters: Pick<ICryptoFilterData, "cryptoDetailFilters" | "genericFilters">
  ) => {

    const { id, days } = filters?.cryptoDetailFilters;
    const { currency } = filters?.genericFilters;

    const crypto_details_url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
    try {
      const res = await fetch(crypto_details_url, { method: "GET" });
      const data = await res.json();
      const status = res.status;
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

  const getTopGainersAndLosers = async (
    filters: Pick<ICryptoFilterData, "genericFilters">
  ) => {
    const { currency } = filters?.genericFilters;

    const crypto_top_gainer_url = `${services_url.crypto}/top_gainers?currency=${currency}`;

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
