// src/index.ts
import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { allowedHeaders, allowedOrigins } from "./config/configs";
import nasa_router from "./routes/nasa/nasa-routes";
import github_router from "./routes/github/github-routes";
import weather_router from "./routes/weather/weather-routes";
import crypto_router from "./routes/crypto/crypto-routes";
import { loggingMiddleware } from "./Middlewares/log-middleware";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(express.json());

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "PUT"],
  allowedHeaders: allowedHeaders,
};

app.use(cors(corsOptions));

app.use(loggingMiddleware);

app.use("/nasa", nasa_router);
app.use("/github", github_router);
app.use("/weather", weather_router);
app.use("/crypto", crypto_router);

export default app;
