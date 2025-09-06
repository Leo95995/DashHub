import dashHub from "../../../assets/icons/dashhub.png";
import ModeToggler from "../../toggler";

const Header: React.FC = () => {
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
        <ModeToggler/>
      </header>
    </>
  );
};

export default Header;
