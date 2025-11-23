// Jest
import { describe, it, expect } from "@jest/globals";
// Fn
import {
  validateAvatarColor,
  validateUsername,
} from "../../src/utils/validators";

// ----- VALIDATE USERNAME ------
describe("Validate Username", () => {

  it("Should be Valid", () => {
    const res = validateUsername("leo");
    expect(res).toBe(true);
  });

    it("Should be Invalid", () => {
    const res = validateUsername("lo");
    expect(res).toBe(false);
  });

  it("Should be Valid", () => {
    const res = validateUsername("leonard", 6);
    expect(res).toBe(true);
  });

  it("Should be Invalid", () => {
      const res = validateUsername("leo", 3);
    expect(res).toBe(false);
  });

});

// ----- VALIDATE AVATAR COLOR ------
describe("Validate Avatar color", () => {
  it("Should be invalid", () => {
    const res = validateAvatarColor("");
    expect(res).toBe(false);
  });

  it("Should be Valid", () => {
    const res = validateAvatarColor("leo");
    expect(res).toBe(true);
  });
});
