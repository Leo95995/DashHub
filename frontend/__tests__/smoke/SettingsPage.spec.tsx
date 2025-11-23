// Jest globals
import { describe, it } from "@jest/globals";
import SettingsPage from "../../src/features/dashboard/pages/SettingsPage";
import { render } from "../test-utils";
import { expectDom } from "../expect";
import { screen } from "@testing-library/react";
import { act } from "react";

describe("SettingsPage smoke tests", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<SettingsPage />);
    });
  });

  it("renders main elements", async () => {
    await act(async () => {
      render(<SettingsPage />);
    });

    const settingsContent = await screen.findByTestId("settings_container");
    expectDom(settingsContent).toBeInTheDocument();
  });
});
