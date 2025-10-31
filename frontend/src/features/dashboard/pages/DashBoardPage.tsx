import { lazy, Suspense } from "react";
import ReactLoader from "../../../components/Loaders/ReactLoaders";
// import { DashBoard } from "../components";

const DashBoard = lazy(() => import("../components/DashBoard"));

const DashBoardPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <>
          <div className="flex flex-col gap-5 w-full h-96 items-center justify-center">
            <p> Loading Dashboard..</p>
            <ReactLoader />
          </div>
        </>
      }
    >
      <DashBoard />
    </Suspense>
  );
};

export default DashBoardPage;
