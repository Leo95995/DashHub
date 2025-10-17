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
import { setGlobalAlert, setUserName } from "../../store/appSlice";
import { isMobile } from "../../utils/media-query";
import { setUserAvatarColor } from "../../store/appSlice";
import { IGlobalAlertStatus } from "../alert/alert";
const ProfileBar: React.FC<IProfileBar> = ({ expanded, screenWidth }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => state.app.userData);

  const { username, avatar_color } = userdata.userInfo;
  const [newUsername, setNewUsername] = useState<string>(username ?? "");
  // Activate the color edit mode
  const [editColor, setEditColor] = useState<boolean>(false);
  const [newColor, setNewColor] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const changeAvatarColor = (e: any) => {
    setNewColor(e.currentTarget.value);
  };

  const save = () => {
    setIsSaving(true);
    setEditColor(false);
    dispatch(setUserAvatarColor(newColor) as any);
    setIsSaving(false);
  };

  const changeUsername = () => {
    if (newUsername.length > 0) {
      dispatch(setUserName(newUsername));
      setEditMode(!editMode);
    } else {
      alert("The minimum username length is of 5 characters");
    }
  };

  const saveByInput = (char: string) => {
    if (char === "Enter") {
      changeUsername();
    }
  };

  return (
    <>
      <div
        className={`flex items-center gap-2 p-2 ${
          !expanded && "justify-center"
        }`}
      >
        <div>
          {editColor && (
            <div
              className={`relative z-30  flex mx-4 ${
                isMobile(screenWidth) ? "justify-end " : "justify-start"
              }`}
            >
              <div className="shadow-2xl absolute items-start flex-col justify-end border bg-white dark:border-gray-700 border-gray-200 flex dark:bg-slate-800 dark:text-white p-2 mx-5 mt-4 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-nowrap">
                    Select Color
                  </label>
                  <input
                    name="color"
                    type="color"
                    defaultValue={avatar_color}
                    onChange={changeAvatarColor}
                    className="block border-gray-300 rounded-md py-1 mt-1 cursor-pointer"
                  />
                </div>
                <div className="flex gap-1 dark:text-slate-700 mb-2">
                  <InputSearch
                    width="w-45 p-2"
                    placeholder="Insert your new username"
                    onChange={(e) => setNewUsername(e)}
                    isLoading={isSaving}
                  />
                </div>
                <div className="flex gap-1 text-sm  text-black">
                  <button
                    onClick={() => {
                      save();
                      changeUsername();
                      setEditColor(false);
                      setEditMode(false);
                      dispatch(
                        setGlobalAlert({
                          status: IGlobalAlertStatus.SUCCESS,
                          message: "Success",
                          description: (
                            <p>
                              Modified username and avatar with success
                            </p>
                          ),
                        })
                      );
                    }}
                    className="cursor-pointer border border-gray-200 rounded-2xl bg-gray-200 px-2 hover:bg-blue-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditColor(false)}
                    className="cursor-pointer rounded-2xl px-1 border-gray-200  bg-gray-200 hover:bg-blue-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <span
            onClick={() => setEditColor((prev) => !prev)}
            style={{ background: avatar_color ?? "#e5a50a" }}
            className="rounded-full h-11 w-11 overflow-ellipsis p-1 cursor-pointer justify-center flex items-center hover:border-slate-200 hover:border hover:scale-105 transition-all "
          >
            {createShortName(username)}
          </span>
        </div>
        {expanded && !isMobile(screenWidth) && (
          <div className="flex items-center gap-2">
            {!editMode ? (
              <p style={{ margin: 0 }}>{username ?? `Guest`}</p>
            ) : (
              <InputSearch
                width="w-35 md:w-35"
                placeholder="Insert your new username"
                onChange={(e) => setNewUsername(e)}
                isLoading={isSaving}
                onKeyUp={saveByInput}
              />
            )}
            {!editMode && (
              <button
                onClick={() => setEditMode(!editMode)}
                className="cursor-pointer hover:text-blue-400"
              >
                <Edit style={{ height: "16px" }} />
              </button>
            )}
            {editMode && (
              <div className="flex gap-1 dark:text-slate-700">
                <button
                  onClick={changeUsername}
                  className="cursor-pointer border border-gray-200  rounded-2xl bg-gray-200 px-2 hover:bg-blue-200 active:scale-95"
                >
                  <Save className="rounded-md" style={{ height: "20px" }} />
                </button>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="cursor-pointer border border-gray-200 rounded-2xl bg-gray-200 px-2 hover:bg-blue-200 active:scale-95"
                >
                  <Cancel className="rounded-md" style={{ height: "20px" }} />{" "}
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
