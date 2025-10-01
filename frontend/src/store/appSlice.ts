import type { IGlobalAlert, IGlobalAlertStatus } from "./interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface ISideBar {
    expanded: boolean 
}

const initialSideBar : ISideBar = {
    expanded: true
}

const initialState = {
  internalLoad: false,
  sideBar: initialSideBar,
  userData: { userInfo: {}, preferences: { } },
  isEditMode: false,
  globalAlert: {
    status: "" as IGlobalAlertStatus,
    message: "",
    description: "",
  } as IGlobalAlert,
};

// Application slice.

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setEditMode: (state, action)=> {
      state.isEditMode = action.payload as boolean;
    },
    setUserInfo: (state, action ) => {
      state.userData.userInfo = action.payload
    }, 
    setPreferences:(state,action)=>{
      state.userData.preferences = action.payload
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
  },
});

export const { setEditMode, setUserInfo, setPreferences, setGlobalAlert, setSideBarStatus } = appSlice.actions;
