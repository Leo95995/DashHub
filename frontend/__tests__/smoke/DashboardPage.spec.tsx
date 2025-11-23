import { describe, it } from "@jest/globals";
import DashBoardPage from "../../src/features/dashboard/pages/DashBoardPage";
import { render } from "../test-utils";
import { expectDom } from "../expect";
import { screen } from "@testing-library/react";
import { act } from "react";

describe("DashboardPage smoke tests", () => {
  it("renders Dashboard without crashing", async () => {
    await act(async () => {
      render(<DashBoardPage />);
    });
  }, 20000);

  it("renders main elements", async () => {
    await act(async () => {
      render(<DashBoardPage />);
    },);

    const header = await screen.findByTestId("welcome_text");
    expectDom(header).toBeInTheDocument();

    const widgetSection = screen.getByTestId("dashboard_header");
    expectDom(widgetSection).toBeInTheDocument();
  }, 20000);
});
