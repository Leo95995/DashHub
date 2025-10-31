// Environment Variables
export const environment = {
  backend_url: import.meta.env.VITE_BACKEND_URI,
};

// BasePath for services
export const services_url = {
  nasa: environment.backend_url + "/nasa",
  github: environment.backend_url + "/github",
  crypto: environment.backend_url + "/crypto",
  weather: environment.backend_url + "/weather",
  PROXY_ENDPOINT: "/proxy-image"
};


// Get current mode
const getMode = () => {
  return import.meta.env.MODE;
};

// Production Environment

const isProduction = () => {
  if (getMode() === "production") {
    return true;
  }
  return false;
};

// Development environment
const isDevelopment = () => {
  if (getMode() === "development") {
    return true;
  }
  return false;
};

export const AppMode = {
  getMode,
  isProduction,
  isDevelopment,
};
