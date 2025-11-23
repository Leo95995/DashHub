// Jest
import { describe, it, expect } from "@jest/globals";
// Fn
import { getTodayFormattedDate } from "../../src/utils/nasa-utils";


describe('Create proxy url', () => {
  it('Should get a date', () => {
       const result =  getTodayFormattedDate(5)
       expect(result).toBeDefined()

  });
});