import { describe, it, expect } from "@jest/globals";

import {
  chunkArray,
  pickRandomElement,
  generateDistinctColors,
  createShortName,
} from "../../src/utils/generic-utils";

// ------- CHUNK ARRAY  --------
describe("Chunk Array Utils", () => {
  it("should return the correct array", () => {
    const res = chunkArray([], 1);
    expect(res).toEqual([]);
  });

  it("should return the correct array", () => {
    const res = chunkArray(["test", "prova", "example"], 1);
    expect(res).toEqual([["test"], ["prova"], ["example"]]);
  });
});

// ------- PICK RANDOM ELEMENT  --------

describe("PickRandomElement function", () => {
  const mockedArray = ["test", "prova", "example", "tester", "random"];

  it("Should pick nothing", () => {
    const res = pickRandomElement([]);
    expect(res).toEqual(undefined);
  });

  it("Should pick one of the passed elements", () => {
    const res = pickRandomElement(mockedArray);

    const data = mockedArray.find((el) => el === res);
    expect(data).toBeDefined();
  });
});


// ------- CREATE SHORT NAME --------

describe("Create Short name", () => {
  it("", () => {
    const res = createShortName("Utente Test");
    expect(res).toBe("UT");
  });

  it("should Return G of guest when value is not provided", () => {
    const res = createShortName("");
    expect(res).toBe("G");
  });

  it("Should return only the first 3 letters", () => {
    const res = createShortName("Utente Test Prova Test");
    expect(res).toBe("UTP");
  });
});

// ----- GENERATE DISTINCT COLORS -------

describe("Generate distinct colors", () => {
  it("Should return an empty array when count is 0", () => {
    const res = generateDistinctColors(0);
    expect(res).toEqual([])
    expect(res).toHaveLength(0)
  });

  it("Should generate 255 random colors", () => {
    const res = generateDistinctColors(255);
    expect(res[0]).toContain('hsla')
    expect(res).toHaveLength(255)
  });
});



