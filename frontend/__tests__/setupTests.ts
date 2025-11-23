import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals';
if (!global.TextEncoder) {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
// @ts-ignore
global.TextDecoder = TextDecoder;

// fetch mock globale con tipi corretti
const mock = jest.fn() as jest.Mock;
global.fetch = mock as unknown as typeof fetch;


// mocko i valori che non posso avere
// setupTests.ts


type ModeType = "test"| "production" | "development"


jest.doMock("../src/utils/environment", () => {
  const backendUrl = "http://localhost:3000"; // valore di test
  let mode: ModeType = "test"; 
  return {
    environment: {
      backend_url: backendUrl,
    },
    services_url: {
      nasa: backendUrl + "/nasa",
      github: backendUrl + "/github",
      crypto: backendUrl + "/crypto",
      weather: backendUrl + "/weather",
      PROXY_ENDPOINT: "/proxy-image",
    },
    AppMode: {
      getMode: () => mode,
      isProduction: () => mode === "production",
      isDevelopment: () => mode === "development",
      _setMode: (m: ModeType) => {
        mode = m;
      },
    },
  };
});
