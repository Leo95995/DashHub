import SideBar from "./SideBar";
import MainContent from "./MainContent";
import Header from "./Header";
import { Outlet } from "react-router";
import useScreenWidthHook from "../../../hooks/useScreenWidthHook";

const PrivateLayout: React.FC = () => {
  const { screenWidth } = useScreenWidthHook();

  return (
    <>
      <div className="z-1">
        <div className="flex mt-4 ">
          <SideBar testId="layout_sidebar" />
          <div className="flex flex-col w-full  ">
            <Header testId="layout_header" screenWidth={screenWidth} />
            <main>
              <MainContent testId="layout_maincontent">
                <Outlet />
              </MainContent>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
