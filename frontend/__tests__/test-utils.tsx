import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "../src/context/ThemeContext";
import { appStore } from '../src/store/appStore'


// Wrap the app with all the providers
const ProviderGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider>
        <Provider store={appStore}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </ThemeProvider>
    </>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ProviderGroup, ...options });

export * from "@testing-library/react";
export { customRender as render };
