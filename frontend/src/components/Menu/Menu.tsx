import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import type { IGenericMenu } from "./types";


const GenericMenu: React.FC<IGenericMenu> = ({ menuOptions }) => {

   if(!menuOptions.length){
    return <p> No options Available.</p>
   } 


  return (
    <Paper sx={{ width: 200, position: "absolute", top: 45, left: 20 }}>
      <MenuList>
        {menuOptions?.map((option) => {
          return (
            <MenuItem className="border-2" onClick={()=>option?.action()}>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>{option.text}</ListItemText>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {option?.shortcut && option.shortcut}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Paper>
  );
};

export default GenericMenu;
