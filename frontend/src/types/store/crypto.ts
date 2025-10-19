export interface CryptoItem {
  usd: number;
  usd_24h_change: number;
  eur: number;
  eur_24h_change: number;
}

export interface ICryptoTrendings {
  [key: string]: CryptoItem;
}

export type ICryptoDetails = Array<Array<Number>>;

export interface ICryptoTopGainers {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
  marketCap: number;
}