import { describe, it } from "@jest/globals";
import { render } from "../test-utils";
import { expectDom } from "../expect";
import { screen } from "@testing-library/react";
import { act } from "react";
import { jest } from '@jest/globals'
// Component
import Layout from "../../src/components/Layout/PrivateLayout/Layout";

// Mock maincontent because it contains data heavy logic
jest.mock("../../src/components/Layout/PrivateLayout/MainContent", () => () => (
  <div data-testid="mock-maincontent">MOCK MAINCONTENT</div>
));

describe("Layout smoke tests", () => {
  it("renders the Layout without crashing", async () => {
    await act(async () => {
      render(<Layout />);
    });
  });

  it("renders main Layout elements", async () => {
    await act(async () => {
      render(<Layout />);
    });
    // Check if sidebar is present.
    const sidebar = await screen.findByTestId("layout_sidebar");
    expectDom(sidebar).toBeInTheDocument();
    // Check if header is present
    const header = screen.getByTestId("layout_header");
    expectDom(header).toBeInTheDocument();
    // Check if main content is present
    const mainContent = screen.getByTestId("mock-maincontent");
    expectDom(mainContent).toBeInTheDocument();
  });
});
