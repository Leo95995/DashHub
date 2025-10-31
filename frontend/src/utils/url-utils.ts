import { environment, services_url } from "./environment";

export const createProxyUrl = (originalUrl: string): string => {
  if (!originalUrl) return "";

  const encodedUrl = encodeURIComponent(originalUrl);

  const proxyUrl = `${environment.backend_url}${services_url.PROXY_ENDPOINT}?sourceUrl=${encodedUrl}`

  return proxyUrl;
};
