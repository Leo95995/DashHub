import {  NextFunction, Request, Response } from "express";
import { URL } from "url";
import { Readable } from "stream";
const WHITELISTED_DOMAINS = [
  "apod.nasa.gov",
  "coin-images.coingecko.com",
  "avatars.githubusercontent.com",
  "catamphetamine.github.io",
  "openweathermap.org",
];

const determineMaxAge = (hostname: string): number => {
  if (hostname.includes("nasa.gov")) return 86400;
  if (hostname.includes("openweathermap.org")) return 3600;
  if (
    hostname.includes("coingecko.com") ||
    hostname.includes("githubusercontent.com")
  )
    return 2592000;
  return 604800;
};

export const ProxyMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const externalUrlString = req.query.sourceUrl;

  if (!externalUrlString || typeof externalUrlString !== "string") {
    return res.status(400).send("Missing or invalid sourceUrl parameter.");
  }

  let externalUrl: URL;
  try {
    externalUrl = new URL(externalUrlString);
  } catch (e) {
    return res.status(400).send("Invalid sourceUrl format.");
  }

  if (!WHITELISTED_DOMAINS.includes(externalUrl.hostname)) {
    console.warn(
      `[PROXY DENIED] Unauthorized domain attempt: ${externalUrl.hostname}`
    );
    return res.status(403).send("Domain not authorized for proxy.");
  }

  const maxAgeSeconds = determineMaxAge(externalUrl.hostname);

  try {
    const response = await fetch(externalUrl.href);

    if (!response.ok) {
      return res
        .status(response.status)
        .send(`External asset failed: ${response.statusText}`);
    }
    const contentType = response.headers.get("Content-Type");
    if (contentType) {
      res.set("Content-Type", contentType);
    }
    res.set("Cache-Control", `public, max-age=${maxAgeSeconds}, immutable`);

    // Trasforma il body di fetch ReadableStream in un Node Stream compatibile
    if (response.body) {
      // MIDEVO RICORDARE DI NON USARE res.json() o await response.json()
      Readable.fromWeb(response.body as any).pipe(res);
    } else {
      res.status(500).send("Empty response body from external server.");
    }
  } catch (error: any) {
    console.error(`Error proxying ${externalUrl.hostname}:`, error.message);
    // Lancio errore generico
    res.status(500).send("Failed to fetch external asset.");
  }
};
