import fs from "fs";
// Utils
import { setFolder } from "../utils/create-folder";
import { getLogLevel } from "../utils/log-utils";
import { Log } from "../model/LogModel";
// Express
import { NextFunction, Request, Response } from "express";

export const loggingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Startdates
  const start = Date.now();
  // Ip
  const ip = req.headers["x-real-ip"] || req.ip;

  setFolder("./logs");

  // Base log
  const baseLog = `[${new Date().toISOString()}] [IN] ${req.method} ${
    req.path
  } from ${ip}\n , params: ${JSON.stringify(req.params) ?? ""},  query: ${
    JSON.stringify(req?.query) ?? ""
  }`;

  const startLog = {
    type: "IN",
    method: req.method,
    path: req.path,
    ip: ip,
    params: req.params ?? {},
    query: req.query ?? {},
    date: new Date().toISOString(),
  };
  await Log.create(startLog);

  res.on("finish", async () => {
    const durationMs = Date.now() - start;
    const logLevel = getLogLevel(res.statusCode, durationMs);

    const finishLog = {
      type: "OUT",
      method: req.method,
      path: req.path,
      ip: ip,
      durationMs: durationMs,
      logLevel,
      params: req.params ?? {},
      query: req.query ?? {},
      date: new Date().toISOString(),
    };

    await Log.create(finishLog);
  });

  next();
};
