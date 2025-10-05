import { Edit, Save } from "lucide-react";
import InputSearch from "../input/input";
import { useState } from "react";
import { Cancel } from "@mui/icons-material";
import { useSelector } from "react-redux";

interface IProfileBar {
  expanded: boolean;
}

const ProfileBar: React.FC<IProfileBar> = ({ expanded }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { username } = useSelector((state:any)=> state.app.userData.userInfo)


 

  return (
    <>
      <div
        className={`flex items-center gap-2 p-2 ${
          !expanded && "justify-center"
        }`}
      >
        <div>
          <span className="rounded-md bg-amber-500 h-8 w-8 justify-center flex items-center border">
            LM
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
                onChange={(e) => console.log(e)}
                isLoading={false}
              />
            )}
            {
              <button className="cursor-pointer" >
                {!editMode ? (
                  <Edit onClick={() => setEditMode(!editMode)} style={{ height: "16px" }} />
                ) : (
                  <div className="flex gap-2">
                    <Save onClick={() => {
                      setEditMode(!editMode)}} style={{ height: "16px" }} />{" "}
                    <Cancel onClick={() => setEditMode(!editMode)} style={{ height: "16px" }} />
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
