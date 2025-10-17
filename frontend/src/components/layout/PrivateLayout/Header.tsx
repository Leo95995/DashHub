import dashHub from "../../../assets/icons/dashhub.png";
import ProfileBar from "../../profileBar";
import ModeToggler from "../../toggler";
import MobileFilters from "./MobileFilters";

interface IHeader {
  screenWidth: number;
}

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
        <p>DashHub</p>
        <ModeToggler />
        <MobileFilters />
        <div className="flex flex-1 justify-end xl:hidden ">
          <ProfileBar screenWidth={screenWidth} expanded={true} />
        </div>
      </header>
    </>
  );
};

export default Header;
