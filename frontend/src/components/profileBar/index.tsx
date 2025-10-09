//  Icons
import { Edit, Save } from "lucide-react";
import { Cancel } from "@mui/icons-material";
// React/Redux
import { useState } from "react";
import { createShortName } from "../../utils/generic-utils";
import InputSearch from "../input/input";
import { useDispatch, useSelector } from "react-redux";
// Interfaces
import type { IProfileBar } from "./interfaces";
import { setUserName } from "../../store/appSlice";

const ProfileBar: React.FC<IProfileBar> = ({ expanded }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.app.userData);

  const username = userdata.userInfo.username;
  const [newUsername, setNewUsername] = useState<string>(username ?? "");

  return (
    <>
      <div
        className={`flex items-center gap-2 p-2 ${
          !expanded && "justify-center"
        }`}
      >
        <div>
          <span className="rounded-full bg-amber-500 h-11 w-11 overflow-ellipsis p-1 justify-center flex items-center hover:scale-105 transition-all ">
            {createShortName(username)}
          </span>
        </div>
        {expanded && (
          <div className="flex items-center gap-2">
            {!editMode ? (
              <p style={{ margin: 0 }}>{username ?? `Guest`}</p>
            ) : (
              <InputSearch
                width="w-48 md:w-64"
                placeholder="Insert your new username"
                onChange={(e) => setNewUsername(e)}
                isLoading={false}
              />
            )}
            {
              <button className="cursor-pointer">
                {!editMode ? (
                  <Edit
                    onClick={() => setEditMode(!editMode)}
                    style={{ height: "16px" }}
                  />
                ) : (
                  <div className="flex gap-2">
                    <Save
                      onClick={() => {
                        dispatch(setUserName(newUsername));
                        setEditMode(!editMode);
                      }}
                      style={{ height: "16px" }}
                    />
                    <Cancel
                      onClick={() => setEditMode(!editMode)}
                      style={{ height: "16px" }}
                    />
                  </div>
                )}
              </button>
            }
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileBar;
