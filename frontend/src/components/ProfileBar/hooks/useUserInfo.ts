import { useState } from "react";
// Slice
import { useUserActions } from "./useUserActions";

// Hook responsible of using User Info
export const useUserInfo = ({ username }: { username: string }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>(username ?? "");
  const [editColor, setEditColor] = useState<boolean>(false);
  const [newColor, setNewColor] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { updateUserName, updateUserAvatar } = useUserActions();

  const changeAvatarColor = (e: any) => {
    setNewColor(e.currentTarget.value);
  };

  // function to save
  const save = () => {
    setIsSaving(true);
    setEditColor(false);
    updateUserAvatar(newColor as string);
    setIsSaving(false);
  };

  const internalSave = () => {
    if (!changeUsername()) {
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
      setEditMode(!editMode);
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
