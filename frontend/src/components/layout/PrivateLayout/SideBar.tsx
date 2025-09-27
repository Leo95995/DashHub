import ProfileBar from "../../profileBar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import Filters from "../../filters";
import { useSelector, useDispatch } from "react-redux";
import { setSideBarStatus } from "../../../store/appSlice";

interface ISideBar {
  primary?: boolean;
}

const SideBar: React.FC<ISideBar> = ({ ...props }) => {
  const sidebar = useSelector((state: any) => state.app.sideBar);
  const { expanded } = sidebar;

  const dispatch = useDispatch();

  const handleSideExpansion = () => {
    dispatch(setSideBarStatus(!expanded));
  };

  return (
    <>
      <aside
        className={`px-2 py-1 h-screen ${
          expanded ? "w-80" : "w-20"
        } bg-slate-100 border-gray-200  dark:bg-slate-700 text-black dark:text-white  xl:block hidden border-t-0 transition-all  `}
      >
        <ProfileBar expanded={expanded} />
        <div
          className={`flex w-full   ${
            !expanded ? `justify-center` : "justify-end"
          }`}
          aria-label="expansion"
        >
          <Tooltip title={expanded ? "Riduci" : "Espandi"} placement="right">
            <button
              onClick={handleSideExpansion}
              aria-label="expand button"
              className="cursor-pointer  text-gray-500 py-2 px-2 dark:text-white dark:hover:bg-slate-800"
            >
              {expanded ? (
                <ArrowForwardIos className="rotate-180" />
              ) : (
                <ArrowForwardIos />
              )}
            </button>
          </Tooltip>
        </div>
        <Filters />
      </aside>
    </>
  );
};

export default SideBar;
