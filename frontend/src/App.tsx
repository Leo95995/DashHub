import { useState, lazy, Suspense } from "react";
import { routes } from "./routes";
import { Routes, Route } from "react-router";
import PrivateLayout from "./components/layout/PrivateLayout/Layout";
import { protectedRoutes } from "./routes/protectedRoutes";

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
                    <Suspense fallback={<>Caricamento Dashboard..</>}>
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
