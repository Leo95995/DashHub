import { useState } from "react";
// Slice
import { useUserActions } from "./useUserActions";
import { validateUsername } from "../../../utils/validators";
import { useGlobalAlert } from "../../../hooks/useAlert";
import { IGlobalAlertStatus } from "../../../types/store/app";

// Hook responsible of using User Info
export const useUserInfo = ({
  username,
  color,
}: {
  username: string;
  color: string;
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>(username ?? "");
  const [editColor, setEditColor] = useState<boolean>(false);
  const [newColor, setNewColor] = useState<string | null>(color);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { handleAlert } = useGlobalAlert();
  const { updateUserName, updateUserAvatar } = useUserActions();

  const changeAvatarColor = (e: any) => {
    setNewColor(e.currentTarget.value);
  };

  // function to save
  const save = () => {
    setIsSaving(true);
    setEditColor(false);
    updateUserAvatar(newColor ?? (color as string));
    updateUserName(newUsername ?? (username as string));
    setIsSaving(false);
  };

  const internalSave = () => {
    if (!newColor) {
      handleAlert(IGlobalAlertStatus.ERROR, "Error", `No color selected`);
      return;
    } else if (!validateUsername(newUsername, 4)) {
      handleAlert(
        IGlobalAlertStatus.ERROR,
        "Error",
        `Username too short. it must be longer than 4 characters`
      );
      return;
    } else {
      save();
      setEditColor(false);
      setEditMode(false);
    }
  };

  // Updated save input
  const saveByInput = (char: string) => {
    if (char === "Enter") {
      changeUsername();
    } else if (char === "Escape") {
      setEditMode(false);
    }
  };

  //  Modify usenarme
  const changeUsername = () => {
    if (updateUserName(newUsername)) {
      return true;
    } else {
      return false;
    }
  };

  return {
    setNewUsername,
    changeUsername,
    isSaving,
    editColor,
    editMode,
    setEditMode,
    setEditColor,
    changeAvatarColor,
    saveByInput,
    internalSave,
  };
};
