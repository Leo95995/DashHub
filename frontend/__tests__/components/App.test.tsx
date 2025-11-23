import { screen } from "@testing-library/react";
import { render } from "../test-utils"; // il tuo customRender
import App from "../../src/App";
import { describe, it } from "@jest/globals";
import { expectDom } from "../expect";
import { act } from "react";

describe("App component", () => {
  it("renders the main header", async () => {
    await act(async () => {
      render(<App />);
    });

    // esempio: verifica che ci sia un testo
    const heading = await screen.findByText(/welcome/i);
    expectDom(heading).toBeInTheDocument();
  });

  it("renders the app title", async () => {
    await act(async () => {
      render(<App />);
    });
    const appTitle = await screen.findByText(/dashhub/i);
    expectDom(appTitle).toBeInTheDocument();
  });

  it("Renders the widget switcher", async () => {
     await act(async () => {
      render(<App />);
    });
    const widget_changers = await screen.findAllByText(/change widget/i);
    expectDom(widget_changers[0]).toBeInTheDocument();
  });
});
