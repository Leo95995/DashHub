import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import GenericMenu from "../menu/genericMenu";
import type { IMenuOption } from "../menu/interfaces";
import { useState } from "react";

interface IProfileBar {
  expanded: boolean;
}


const menuOptions : IMenuOption[] =[{text:'Testing' ,action:()=>console.log('testing'), shortcut: "g" } ]

const ProfileBar: React.FC<IProfileBar> = ({ expanded }) => {

  const [menuStatus, setMenuStatus] = useState<boolean>(false)

  return (
    <>
      <div
        className={`flex items-center gap-2 p-2 ${
          !expanded && "justify-center"
        }`}
      >
        <div>
          <Button onClick={() => setMenuStatus((prev)=> !prev)} style={{position:'relative'}}>
            <span className="rounded-md bg-amber-500 h-8 w-8 justify-center flex items-center border"> LM</span>
            {menuStatus && <GenericMenu menuOptions={menuOptions} />}
          </Button>
        </div>
        {expanded && (
          <>
            <p>userData</p>
            <button >
              <Search />
            </button>
            <button></button>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileBar;
