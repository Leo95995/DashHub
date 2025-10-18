// React lazy
import { lazy, Suspense, useEffect } from "react";
import { routes } from "./routes";
// React router info
import { Routes, Route } from "react-router";
//  Components
import PrivateLayout from "./components/layout/PrivateLayout/Layout";
import ReactLoader from "./components/loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoCurrenciesList } from "./store/cryptoSlice";
import FirstVisitModal from "./features/dashboard/components/firstVisitModal";
import { setFirstVisit } from "./store/appSlice";
import LoaderWithMessage from "./components/loader/loaderAndText";
import Alert from "./components/alert/alert";

// Public Routes
const DashBoardPage = lazy(() => import("./pages/privates/DashboardPage"));
// Settings page for lazy routes
// const SettingsPage = lazy(() => import("./pages/privates/SettingsPage"));

function App() {
  const userdata = useSelector((state: any) => state.app.userData);
  // Data relative to first visit
  const { firstVisit } = userdata;

  const globalLoad = useSelector((state: any) => state.app.globalLoad);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptoCurrenciesList() as any);
  }, []);

  return (
    <>
    {/* This handle the global alert */}
      <Alert />
      <>
        {!firstVisit && (
          <FirstVisitModal
            firstVisit={!firstVisit}
            setFirstVisit={setFirstVisit}
          />
        )}
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
                    {!globalLoad ? (
                      <DashBoardPage />
                    ) : (
                      <LoaderWithMessage text="Loading page" />
                    )}
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
