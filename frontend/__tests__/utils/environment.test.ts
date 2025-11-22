import { jest, beforeAll, describe, expect, it } from "@jest/globals";
// Specify the mock

import { EnvMock } from "../types";

const { environment, services_url, AppMode } = jest.requireMock("../../src/utils/environment") as EnvMock;

describe("Environment module", () => {
  // Mock delle env vars
  it("should return the correct backend_url", () => {
    expect(environment.backend_url).toBe("http://localhost:3000");
  });

  it("should build the correct services urls", () => {
    expect(services_url.nasa).toBe("http://localhost:3000/nasa");
    expect(services_url.github).toBe("http://localhost:3000/github");
    expect(services_url.crypto).toBe("http://localhost:3000/crypto");
    expect(services_url.weather).toBe("http://localhost:3000/weather");
    expect(services_url.PROXY_ENDPOINT).toBe("/proxy-image");
  });

  it("should return the current mode", () => {
    expect(AppMode.getMode()).toBe("test");
  });

  it("should detect development mode", () => {
    AppMode._setMode("development")
    expect(AppMode.isDevelopment()).toBe(true);
    expect(AppMode.isProduction()).toBe(false);
  });

  it("should detect production mode", () => {
    AppMode._setMode("production");
    expect(AppMode.isProduction()).toBe(true);
    expect(AppMode.isDevelopment()).toBe(false);
  });
});
