import { environment } from "./environment";

export const allowedHeaders = ["Content-Type", "Authorization"];

export const allowedOrigins = ["http://localhost:5173", environment.FE_ORIGIN];
