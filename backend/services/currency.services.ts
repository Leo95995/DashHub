// import crypto
import mongoose from "mongoose";

const currenciesUrl = {
  eur: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur",
  usd: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
};

/**
 * Importante:
 * Quando faccio chiamate che non dipendono l'una dall'altra mi convinene fare
 * Promise all almeno vengono usate in parallelo tra loro.
 */
const updateCurrencies = async () => {
  const db = mongoose.connection;
  const eurCollection = db.collection("currencies_eur");
  const usdCollection = db.collection("currencies_usd");

  try {
    const [eurRes, usdRes] = await Promise.all([
      fetch(currenciesUrl.eur),
      fetch(currenciesUrl.usd),
    ]);

    if (!eurRes.ok || !usdRes.ok) {
      console.error(
        `[CRON] Errore nel fetch per EUR/ USD:`,
        eurRes.status,
        usdRes.status
      );
      return;
    }

    const [eurData, usdData] = await Promise.all([
      eurRes.json(),
      usdRes.json(),
    ]);

    await Promise.all([
      eurCollection.deleteMany({}),
      usdCollection.deleteMany({}),
    ]);

    await Promise.all([
      eurCollection.insertMany(eurData),
      usdCollection.insertMany(usdData),
    ]);

    console.log(`[CRON] Currencies aggiornate con successo`);
  } catch (err) {
    console.error(`[CRON] Errore durante l'aggiornamento`, err);
  }
};

export const CurrencyService = {
  updateCurrencies,
};
