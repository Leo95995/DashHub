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
  const userdata = useSelector((state:any)=> state.app.userData)


  const username  =userdata.userInfo.username;
 
  /**
   * Create a small
   * 
   * @param username 
   * @returns 
   */

  const createShortName = (username: string) => { 
    if(!username){
      return "G";
    }
    const splittedName = username.split(' ');
    let result  = "";

    for(const name of splittedName){
      result += name[0];
    }
    console.log(result);
    return result

  }





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
