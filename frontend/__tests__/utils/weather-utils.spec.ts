import {
  kelvinToCelsius,
  kelvinToFahrenheit,
  timestampToTime,
  regularTimeStampToTime,
  getHoursAndMin,
  get_temperatures,
  background_color,
} from "../../src/utils/weather-utils";

import { describe, it, expect, jest } from "@jest/globals";

describe("Weather utils", () => {
  it("kelvinToCelsius converts properly", () => {
    expect(kelvinToCelsius(273.15)).toBe(0);
    expect(kelvinToCelsius(300)).toBe(27);
  });

  it("kelvinToFahrenheit converts properly", () => {
    expect(kelvinToFahrenheit(273.15)).toBe(32);
    expect(kelvinToFahrenheit(300)).toBe(80);
  });

  it("timestampToTime formats correctly with timezone offset", () => {
    const ts = 1700000000;
    const offset = 3600;

    const result = timestampToTime(ts, offset);

    expect(result.split(' ')[0]).toMatch(/^\d{2}:\d{2}$/);
  });

  it("regularTimeStampToTime uses milliseconds timestamp", () => {
    const date = new Date("2024-01-01T12:00:00Z");
    const timestamp = date.getTime();
    const result = regularTimeStampToTime(timestamp, 0);

    expect(result.split(' ')[0]).toMatch(/^\d{2}:\d{2}$/);
  });

  it("getHoursAndMin returns HH:MM correctly", () => {
    const ts = 1700000000;
    const result = getHoursAndMin(ts);

    expect(result.split(' ')[0]).toMatch(/^\d{1,2}:\d{2}$/);
  });

  describe("get_temperatures", () => {
    it("returns Celsius when type=celsius", () => {
      const result = get_temperatures(300, 290, 310, "celsius");

      expect(result).toEqual({
        standard: expect.stringMatching(/C°/),
        min: expect.stringMatching(/C°/),
        max: expect.stringMatching(/C°/),
      });
    });

    it("returns Kelvin strings when type!=celsius", () => {
      const result = get_temperatures(300, 290, 310, "kelvin");

      expect(result.standard).toBe("300 K");
      expect(result.min).toBe("290 K");
      expect(result.max).toBe("310 K");
    });
  });

  describe("background_color", () => {
    it("returns correct class for clear", () => {
      expect(background_color("clear")).toContain("blue-400");
    });

    it("returns fallback for unknown value", () => {
      expect(background_color("alien-weather")).toContain("from-slate");
    });

    it("case insensitive handling", () => {
      expect(background_color("Clear")).toContain("blue-400");
    });
  });
});
