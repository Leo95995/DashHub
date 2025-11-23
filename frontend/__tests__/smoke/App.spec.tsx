import { describe, it } from "@jest/globals";
import App from "../../src/App";
import { render } from "../test-utils";
import { act } from 'react'

describe("App smoke tests", () => {
  it("renders without crashing",async () => {
    await act(async () => {
      render(<App />);
    });
  });

  it("renders main elements", () => {});
});
