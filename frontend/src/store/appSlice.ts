import { createSlice } from "@reduxjs/toolkit";
import userInfo from "../services/storage/user";
import { initialState } from "./data/appData";

// Application slice.

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.isEditMode = action.payload as boolean;
    },
    setUserInfo: (state, action) => {
      state.userData.userInfo = action.payload;
      userInfo.setUserPreferences(action.payload);
    },
    setUserName: (state, action) => {
      state.userData.userInfo.username = action.payload;
      const currentPref = userInfo.getUserPreferences();
      currentPref.username = action.payload;
      userInfo.setUserPreferences(currentPref);
    },
    setUserAvatarColor: (state, action) => {
      state.userData.userInfo.avatar_color = action.payload;
      const currentPref = userInfo.getUserPreferences();
      currentPref.avatar_color = action.payload;
      userInfo.setUserPreferences(currentPref);
    },
    setFirstVisit: (state, action) => {
      state.userData.firstVisit = action.payload;
      userInfo.setFirstVisit(action.payload);
    },
    setGlobalAlert: (state, action) => {
      const { payload } = action;
      const { status, message, description } = payload;
      state.globalAlert = { status, message, description };
    },
    setSideBarStatus: (state, action) => {
      const { payload } = action;
      state.sideBar.expanded = payload;
    },
    setGlobalLoad(state, action) {
      state.globalLoad = action.payload;
    },
  },
});

export const {
  setGlobalLoad,
  setEditMode,
  setUserName,
  setUserAvatarColor,
  setUserInfo,
  setFirstVisit,
  setGlobalAlert,
  setSideBarStatus,
} = appSlice.actions;
