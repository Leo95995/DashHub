import SideBar from "../PrivateLayout/SideBar";
import MainContent from "./MainContent";
import Header from "./Header";
import {  Outlet } from "react-router";
import type { ILayout } from "../../../interfaces/common/interfaces";


const PrivateLayout: React.FC<ILayout> = () => {
  return (
    <>
    <div className="z-1">
      <div className="flex mt-4 ">
        <SideBar
        />
        <div className="flex flex-col w-full  "> 
          <Header />

          <main>
            <MainContent>
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
