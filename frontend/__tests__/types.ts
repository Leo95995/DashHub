export type EnvMock = {
  environment: { backend_url: string };
  services_url: {
    nasa: string;
    github: string;
    crypto: string;
    weather: string;
    PROXY_ENDPOINT: string;
  };
  AppMode: {
    getMode: () => string;
    isProduction: () => boolean;
    isDevelopment: () => boolean;
    _setMode: (mode: "test" | "development" | "production") => void;
  };
};