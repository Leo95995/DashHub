// src/index.ts
import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { allowedHeaders } from "./config/allowedHeaders";
import nasa_router from "./routes/nasa/nasa-routes";
import github_router from "./routes/github/github-routes";
import weather_router from "./routes/weather/weather-routes";
import crypto_router from "./routes/crypto/crypto-routes";


dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];
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


app.use((req, res, next) => {
  const realIp = req.headers["x-real-ip"] || req.ip;
  const host = req.headers["host"];
  if (process.env.NODE_ENV === "production") {
  } else if (process.env.NODE_ENV === "test") {
  } else {
    console.log("IP reale:", realIp);
    console.log("Host richiesto:", host);
  }

  next();
});


app.use('/nasa', nasa_router)
app.use('/github', github_router)
app.use('/weather', weather_router)
app.use('/crypto', crypto_router)



export default app;
