import * as express from "express";
import { CryptoController } from "../../controllers/crypto-controller";
const crypto_router = express.Router();

crypto_router.get("/currencies", CryptoController.get_currency_list);
crypto_router.get("/top_gainers", CryptoController.getTopGainersAndLosers);
crypto_router.get("/trending", CryptoController.get_trending_cryptos);


export default crypto_router;
