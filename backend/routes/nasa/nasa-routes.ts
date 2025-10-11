import * as express from "express";
import { NasaController } from "../../controllers/nasa-controller";


const nasa_router = express.Router();

nasa_router.get("/apod", NasaController.get_apod );
nasa_router.get("/mars_rover", NasaController.get_mars_rover_data );
nasa_router.get("/neow", NasaController.get_neo_data );


export default nasa_router;
