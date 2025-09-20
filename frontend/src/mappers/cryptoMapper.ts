export interface CryptoItem{
  usd: number,
  usd_24h_change: number,
  eur: number,
  eur_24h_change: number
}

export interface ICryptoTrendings  {
  [key:string] : CryptoItem
}

interface ICryptoTrendResponse {

}

interface ITopGainersAndLosers { }

// Nothing goes mapped here.
const cryptoTrendingMapper= (data: ICryptoTrendings) :  ICryptoTrendings| any => {

    return data as ICryptoTrendings
}



export const CryptoMappers = {
    cryptoTrendingMapper
}