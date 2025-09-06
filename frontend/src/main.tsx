import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { appStore } from "./store/appStore.ts";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
    <Provider store={appStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </ThemeProvider>
  </StrictMode>
);
