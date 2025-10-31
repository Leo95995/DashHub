// React/Redux
import { useSelector } from "react-redux";
//  Icons
import { Edit, Save } from "lucide-react";
import { Cancel } from "@mui/icons-material";
// Utils
import { createShortName } from "../../utils/generic-utils";
import { isMobile } from "../../utils/media-query";
// Components
import InputSearch from "../Input/Input";
// Types
import type { IProfileBar } from "./types";
import { useUserInfo } from "./hooks/useUserInfo";

const ProfileBar: React.FC<IProfileBar> = ({ expanded, screenWidth }) => {
  const userdata = useSelector((state: any) => state.app.userData);
  const { username, avatar_color } = userdata.userInfo;
  // Use user info hook
  const {
    changeUsername,
    setNewUsername,
    isSaving,
    editColor,
    editMode,
    setEditMode,
    setEditColor,
    changeAvatarColor,
    saveByInput,
    internalSave,
  } = useUserInfo({ username , color: avatar_color});

  // Render ui
  const renderDesktopDetails = () => {
    if (!(expanded && !isMobile(screenWidth))) {
      return;
    }
    return (
      <>
        <div className="flex items-center gap-2">
          {!editMode ? (
            <p
              className="truncate max-w-[200px] sm:max-w-[1600px] md:max-w-[200px] overflow-hidden text-ellipsis"
              style={{ margin: 0 }}
              title={username ?? "Guest"}
            >
              {username ?? "Guest"}
            </p>
          ) : (
            <InputSearch
              width="w-35 md:w-35"
              placeholder="Insert your new username"
              defaultValue={username}
              onChange={(e) => setNewUsername(e)}
              isLoading={isSaving}
              onKeyUp={saveByInput}
            />
          )}
          {!editMode && (
            <button
              onClick={() => setEditMode(!editMode)}
              aria-label="Edit Button"
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
      </>
    );
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
                    defaultValue={username}
                    onKeyUp={(e) => {
                      if (e === "Enter") {
                        internalSave();
                      } else if (e === "Escape") {
                        setEditColor(false);
                      }
                    }}
                    placeholder="Insert your new username"
                    onChange={(e) => setNewUsername(e)}
                    isLoading={isSaving}
                  />
                </div>
                <div className="flex gap-1 text-sm  text-black">
                  <button
                    onClick={internalSave}
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
            style={{ background: avatar_color }}
            className="rounded-full h-11 w-11 overflow-ellipsis p-1 cursor-pointer justify-center flex items-center hover:border-slate-200 hover:border hover:scale-105 transition-all "
          >
            {createShortName(username)}
          </span>
        </div>
        {renderDesktopDetails()}
      </div>
    </>
  );
};

export default ProfileBar;
