import { useEffect, useState } from "react";
import ProfileBar from "../../profileBar";
import {
  Home,
  Folder,
  FilterAlt,
  Groups2,
  SettingsApplications,
  HelpCenter,
  ArrowForwardIos,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Link } from "react-router";
import Filters from "../../filters";

interface ISideBar {
  primary?: boolean;
}

type SideBarItem = {
  title: string;
  link: string;
  icon: React.ReactNode | string;
};

const items: SideBarItem[] = [
  {
    title: "Dashboard",
    link: "/",
    icon: <Home />,
  },
  {
    title: "Impostazioni",
    link: "/impostazioni",
    icon: <SettingsApplications />,
  },
];

const SideBar: React.FC<ISideBar> = ({ ...props }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [sectionSelected, setSectionSelected] = useState<string>("");

  useEffect(() => {
    const url = window.location.pathname;
    setSectionSelected(url);
  }, []);

  const handleSideExpansion = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <aside
        className={`px-2 py-1 h-screen ${
          expanded ? "w-80" : "w-20"
        } bg-slate-100 border-gray-200  dark:bg-slate-700 text-black dark:text-white  md:block hidden border-t-0 transition-all  `}
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
            <Filters/>
      </aside>
    </>
  );
};

export default SideBar;
