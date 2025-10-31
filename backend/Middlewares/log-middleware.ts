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
  // skip log middlewar for proxy images
  if (req.path.startsWith("/proxy-image")) {
    return next();
  }
  // ip
  const ip = req.headers["x-real-ip"] || req.ip;
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
