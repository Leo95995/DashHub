// React lazy
import { lazy, Suspense, useEffect } from "react";
import { routes } from "./routes";
// React router info
import { Routes, Route } from "react-router";
//  Components
import PrivateLayout from "./components/layout/PrivateLayout/Layout";
import ReactLoader from "./components/loader";
import { useDispatch } from "react-redux";
import { fetchCryptoCurrenciesList } from "./store/cryptoSlice";


// Public Routes
const DashBoardPage = lazy(() => import("./pages/privates/DashboardPage"));
// const SettingsPage = lazy(() => import("./pages/privates/SettingsPage"));

function App() {
  const dispatch = useDispatch()

  // Fetch all the datas that can be used in all part of app and should not refresh so
  // often
  useEffect(()=> {
    dispatch(fetchCryptoCurrenciesList() as any)
    console.log('crypto currencies fetching')
  }, [])

  // We can check here some things. like if user has already set his preferences or not.

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
