import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import GithubService from "../services/github-service";


const { get_user_activity, get_repo_trend, get_trending_repos } = GithubService()

export const getTrendingRepos = createAsyncThunk(
  "nasa/fetchApod",
  async (_, { rejectWithValue }) => {
    try {
      const nasa_apod_data = await get_trending_repos();
      if (nasa_apod_data.error || !nasa_apod_data.nasaData) {
        return rejectWithValue("Errore nel recupero");
      }
      const { nasaData } = nasa_apod_data;
      return { nasaData };
    } catch (err) {
      return rejectWithValue("Error while fetching nasa data");
    }
  }
);

export const getRepoTrend = createAsyncThunk(
  "nasa/fetchRover",
  async (_, { rejectWithValue }) => {
    try {
      const repoTrend = await get_repo_trend();
      if (!nasa_rover_data) {
        return rejectWithValue("Error while fetching rover data");
      }
      const { roverData } = nasa_rover_data;
      return { roverData };
    } catch (err) {
      return rejectWithValue("Error while fetching rover data");
    }
  }
);

export const getUserActivity = createAsyncThunk(
  "nasa/fetchneows",
  async (_, { rejectWithValue }) => {
    try {
      const nasa_neows_data = await get_user_activity();
      if (nasa_neows_data.error || !nasa_neows_data.neoData) {
        return rejectWithValue("Errore nel recupero");
      }
      const { neoData } = nasa_neows_data;
      const { neows_data } = neoData;
      return { neows_data };
    } catch (err) {
      return rejectWithValue("Error while fetching nasa data");
    }
  }
);







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
