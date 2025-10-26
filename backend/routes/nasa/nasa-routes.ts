import * as express from "express";
import { NasaController } from "../../Controllers/nasa-controller";


const nasa_router = express.Router();

nasa_router.get("/apod", NasaController.get_apod );
nasa_router.get("/cme", NasaController.get_cme_data );
nasa_router.get("/neows", NasaController.get_neo_data );


export default nasa_router;
