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
                width="w-44 md:w-50"
                placeholder="Insert your new username"
                onChange={(e) => setNewUsername(e)}
                isLoading={false}
              />
            )}
            {!editMode && (
              <button className="cursor-pointer">
                <Edit
                  onClick={() => setEditMode(!editMode)}
                  style={{ height: "16px" }}
                />
              </button>
            )}
            {editMode && (
              <div className="flex gap-2">
                <button>
                  <Save
                    className="rounded-md"
                    onClick={() => {
                      dispatch(setUserName(newUsername));
                      setEditMode(!editMode);
                    }}
                    style={{ height: "20px" }}
                  />
                </button>
                <button>
                  <Cancel
                    className="rounded-md"
                    onClick={() => setEditMode(!editMode)}
                    style={{ height: "20px" }}
                  />{" "}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileBar;
