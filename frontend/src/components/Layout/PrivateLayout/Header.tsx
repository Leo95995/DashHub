// Website logo
import dashHub from "../../../assets/icons/dashhub.png";
// Media Query
import { isMobile } from "../../../utils/media-query";
// Components
import ProfileBar from "../../ProfileBar/ProfileBar";
import ModeToggler from "../../Toggler/Toggler";
// Types
import type { IHeader } from "./types";


const Header: React.FC<IHeader> = ({ screenWidth }) => {
  return (
    <>
      <header className="p-4 items-center border-1 rounded-tl-2xl bg-white border-l-0  border-gray-200  dark:bg-slate-800 dark:border-slate-800 dark:text-white flex gap-5">
        <p>
          <img
            src={dashHub}
            alt="dashub icon"
            width={50}
            decoding="async"
            loading="lazy"
            className="rounded-4xl border"
          />
        </p>
        {!isMobile(screenWidth) && <p>DashHub</p>}
        <ModeToggler />
        <div className="flex flex-1 justify-end xl:hidden ">
          <ProfileBar screenWidth={screenWidth} expanded={true} />
        </div>
      </header>
    </>
  );
};

export default Header;
