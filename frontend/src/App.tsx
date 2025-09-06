import { useState, lazy, Suspense } from "react";
import { routes } from "./routes";
import { Routes, Route } from "react-router";
import PrivateLayout from "./components/layout/PrivateLayout/Layout";

// Public Routes
const DashBoardPage = lazy(() => import("./pages/privates/DashboardPage"));
const SettingsPage = lazy(() => import("./pages/privates/SettingsPage"));

function App() {
  // I dont think i will implement a login here. Just showing the clean ui.
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  const { publicRoutes, protectedRoutes } = routes;

  return (
    <>
      {isAuthorized ? (
        <>
          <Routes>
            <Route element={<PrivateLayout />}>
              <Route
                path={protectedRoutes.dashboard}
                element={
                  <>
                    <Suspense fallback={<>Caricamento Dashboard..</>}>
                      <DashBoardPage />{" "}
                    </Suspense>
                  </>
                }
              />
              <Route
                path={protectedRoutes.impostazioni}
                element={
                  <Suspense fallback={<>Caricamento impostazioni..</>}>
                    <SettingsPage />
                  </Suspense>
                }
              />
          </Route>
          </Routes>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
