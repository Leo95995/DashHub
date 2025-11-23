// Jest
import { describe, it, expect } from "@jest/globals";
// Fn
import {
  createProxyUrl
} from "../../src/utils/url-utils";



describe('Create proxy url', () => {
  it('Should create the proxy url', () => {
       const result =  createProxyUrl('/testimage')
       expect(result).toEqual('http://localhost:3000/proxy-image?sourceUrl=%2Ftestimage')

  });
});