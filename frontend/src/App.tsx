import { useState, lazy, Suspense } from "react";
import { routes } from "./routes";
import { Routes, Route } from "react-router";
import PrivateLayout from "./components/layout/PrivateLayout/Layout";
import { protectedRoutes } from "./routes/protectedRoutes";
import ReactLoader from "./components/loader";

// Public Routes
const DashBoardPage = lazy(() => import("./pages/privates/DashboardPage"));
const SettingsPage = lazy(() => import("./pages/privates/SettingsPage"));

function App() {
  return (
    <>
      <>
        <Routes>
          <Route element={<PrivateLayout />}>
            <Route
              path={protectedRoutes.dashboard}
              element={
                <>
                  <Suspense
                    fallback={
                      <>
                        <ReactLoader /> Caricamento Dashboard..
                      </>
                    }
                  >
                    <DashBoardPage />
                  </Suspense>
                </>
              }
            />
          </Route>
        </Routes>
      </>
    </>
  );
}

export default App;
