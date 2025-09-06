// store.ts
import { createSlice, configureStore } from "@reduxjs/toolkit";
// We can also separate slice from the store.

// Actually im not really using userdata. 
const userdata = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};


export type IGlobalAlertStatus = "error" | "success" | "warn" | "";

interface IGlobalAlert {
  status: IGlobalAlertStatus
  message: string
  description: string
}

const initialState = {
  userdata,
  token: "",
  hasAuth: false,
  globalLoad: false,
  internalLoad: false,
  globalAlert : {
    status: "" as IGlobalAlertStatus,
    message: "", 
    description: ""
  } as IGlobalAlert }

  // Application slice.

  const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGlobalAlert: (state, action) => {
      const { payload } = action
      const { status, message ,description} = payload

      state.globalAlert = {status, message, description}
    }
  },
});

export const {  setGlobalAlert } = appSlice.actions;


export const appStore = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

