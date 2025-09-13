import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  github_data: {},
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGithubData(state, action) {
      state.github_data = action.payload;
    },
  },
});

export const { setGithubData } = appSlice.actions;
