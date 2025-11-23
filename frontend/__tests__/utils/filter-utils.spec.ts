import { describe, it, expect } from "@jest/globals";
import { filterUtils } from "../../src/utils/filter-utils";

describe("Filter Utils", () => {
  const mockedList1 = {
    crypto: true,
    github: false,
    nasa: true,
    weather: true,
  };

  const mockedListEmpty = {};
  const mockedInvalidData = [{ invalidData: "!!##", test: "prova" }];

  it("Should return a array with label and value", () => {
    const res = filterUtils(mockedList1);
    expect(res).toHaveLength(4);
    // to be -> verifica referenze
    // to equal valori
    expect(res[0]).toEqual({ value: "crypto", label: "CRYPTO WIDGET" });
    expect(res[1]).toEqual({ value: "github", label: "GITHUB WIDGET" });
  });

  it("Should return an empty array if empty data is passed", () => {
    const res = filterUtils(mockedListEmpty);
    expect(res).toHaveLength(0);
    expect(res).toEqual([]);
  });

  it("Should not broke if invalid data is passed", () => {
    const res = filterUtils(mockedInvalidData);
    expect(res).toEqual([]);
  });
});
