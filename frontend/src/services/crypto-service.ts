
/**
 * 1-
 *  show 2-3 main cryptos  nelle ultime 24 h
 *  https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd,eur&include_24hr_change=true
 * 
 * 2- Mostra andamento prezzo ultima 24h di una crypto selezionata. ( qui per esempio passa bitcoin èposso mettere altro)
 *  potrei magari fare un select su quella desiderata e poi mostrare
 *  https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly
 * 
 * 3- Top Gainers and losers, lista crypto con maggior aumento / calo nelle ultime 24h 
 * https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&price_change_percentage=24h

 */

import { CryptoMappers } from "../mappers/cryptoMapper";

const CryptoService = () => {

  const { cryptoTrendingMapper } = CryptoMappers
  // Qui potrei passare anche magari un array di crypto . quindi utente se li selecta e poi li passa
  const getAllCryptosTrend = async () => {
    const cryptos_url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd,eur&include_24hr_change=true`;
        try {
          const res = await fetch(cryptos_url, { method: "GET" });
          const data = await res.json();
          const status = res.status;
    
          // map datas to
          const mappedTrendingCryptos = cryptoTrendingMapper(data)
          if (data && status === 200) {
            return { trending_cryptos: mappedTrendingCryptos, status: status, error: false };
          } else {
            return { status: status, error: true };
          }
        } catch (error) {
          return { error: true };
        }
  };

  const getCryptoTrend = () => {};

  const getTopGainersAndLosers = () => {};

  return { getAllCryptosTrend, getCryptoTrend, getTopGainersAndLosers };
};

export default CryptoService;
