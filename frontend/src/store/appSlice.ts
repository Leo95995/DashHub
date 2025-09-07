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

export const { setGlobalAlert, setSideBarStatus } = appSlice.actions;
