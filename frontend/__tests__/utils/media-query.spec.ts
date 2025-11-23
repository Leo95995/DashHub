// Jest
import { describe, it, expect } from "@jest/globals";
// Fn
import {
  isMobile,
  isTablet,
  isDesktop,
  getCurrentMode,
} from "../../src/utils/media-query";
// Chart data

// -------- CURRENT MODE --------

describe("Check Current Mode", () => {
  it("It should return Desktop for 1350", () => {
    const res = getCurrentMode(1350);
    expect(res).toBe("desktop");
  });
    it("It should return Desktop for 1400", () => {
    const res = getCurrentMode(1400);
    expect(res).toBe("desktop");
  });

   it("It should return Tablet for 1349", () => {
    const res = getCurrentMode(1349);
    expect(res).toBe("tablet");
  });

   it("It should return Tablet for 769", () => {
    const res = getCurrentMode(769);
    expect(res).toBe("tablet");
  });

     it("It should return Mobile for 768", () => {
    const res = getCurrentMode(768);
    expect(res).toBe("mobile");
  });
     it("It should return Mobile for 500", () => {
    const res = getCurrentMode(500);
    expect(res).toBe("mobile");
  });
});


describe("Check mobile version for 1300", () => {
  it("Should return false ", () => {
    const res = isMobile(1300);
    expect(res).toBe(false);
  });

  it("Should return True", () => {
    const res = isMobile(768);
    expect(res).toBe(true);
  });
});

describe("Check Tablet Version for 1350", () => {
  it("Should return  True ", () => {
    const res = isTablet(1300);
    expect(res).toBe(true);
  });

  it("Should return False for 1400" , () => {
    const res = isTablet(1350);
    expect(res).toBe(false);
  });

  it("Should return False for 1400", () => {
    const res = isTablet(1400);
    expect(res).toBe(false);
  });
    it("Should return true for 769", () => {
    const res = isTablet(769);
    expect(res).toBe(true);
  });

  it("Should return False for 768 ", () => {
    const res = isTablet(768);
    expect(res).toBe(false);
  });
});

describe("Check Desktop Version", () => {

  it("Should return false for 1349 ", () => {
    const res = isDesktop(1349);
    expect(res).toBe(false);
  });

  it("Should return true for 1350", () => {
    const res = isDesktop(1350);
    expect(res).toBe(true);
  });

  it("Should return true for 1400", () => {
    const res = isDesktop(1400);
    expect(res).toBe(true);
  });
});
