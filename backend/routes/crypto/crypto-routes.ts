import * as express from "express";
import { CryptoController } from "../../controllers/crypto-controller";
const crypto_router = express.Router();

crypto_router.get("/currencies", CryptoController.get_currency_list);

export default crypto_router;
