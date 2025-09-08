// React lazy
import { lazy, Suspense } from "react";
import { routes } from "./routes";
// React router info
import { Routes, Route } from "react-router";
//  Components
import PrivateLayout from "./components/layout/PrivateLayout/Layout";
import ReactLoader from "./components/loader";

// Public Routes
const DashBoardPage = lazy(() => import("./pages/privates/DashboardPage"));
// const SettingsPage = lazy(() => import("./pages/privates/SettingsPage"));

function App() {
  return (
    <>
      <>
        <Routes>
          <Route element={<PrivateLayout />}>
            <Route
              path={routes.protectedRoutes.dashboard}
              element={
                <>
                  <Suspense
                    fallback={
                      <>
                        <div className="flex flex-col gap-5 w-full h-96 items-center justify-center">
                          <p> Caricamento Dashboard..</p>
                          <ReactLoader />
                        </div>
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
