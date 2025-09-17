// Create redux slice
import { createSlice } from "@reduxjs/toolkit";
// Thunk
import { createAsyncThunk } from "@reduxjs/toolkit";
// Github Service
import GithubService from "../services/github-service";
import { initialState } from "./data/githubData";
import type { GithubRepo, IUserActivityData } from "../mappers/githubMapper";

const { get_user_activity, get_repo_trend, get_trending_repos } =
  GithubService();

export const fetchTrendingRepos = createAsyncThunk(
  "github/fetchTrendingRepos",
  async (_, { rejectWithValue }) => {
    try {
      const trending_repos = await get_trending_repos();
      if (trending_repos.error || !trending_repos.trendingRepos) {
        return rejectWithValue("Errore nel recupero");
      }
      const { trendingRepos } = trending_repos;
      return { trendingRepos };
    } catch (err) {
      return rejectWithValue("Error while fetching nasa data");
    }
  }
);

export const fetchRepoTrend = createAsyncThunk(
  "github/fetchRepoData",
  async (repo_name: string, { rejectWithValue }) => {
    try {
      const repoTrend = await get_repo_trend(repo_name);
      if (!repoTrend) {
        return rejectWithValue("Error while fetching rover data");
      }
      const { repoDetails } = repoTrend;
      console.log(repoDetails);
      return { repoDetails };
    } catch (err) {
      return rejectWithValue("Error while fetching rover data");
    }
  }
);

export const fetchUserActivity = createAsyncThunk(
  "github/fetchUserActivity",
  async (username: string, { rejectWithValue }) => {
    try {
      const user_activity = await get_user_activity(username);
      if (user_activity.error || !user_activity.user_activity) {
        return rejectWithValue("Errore nel recupero");
      }
      const { user_activity:activity } = user_activity;
      
      // const { neows_data } = repoDetails;
      return activity;
    } catch (err) {
      return rejectWithValue("Error while fetching nasa data");
    }
  }
);

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setUserActivityData(state, action) {
      state.userActivityData.data = action.payload;
    },
    setTrendingRepoList(state, action){
      state.trending_repos_data.data = action.payload as GithubRepo[]
    },
    setSelectedUserRepo(state, action){
      // repo e stats
      state.repo_data.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Trending Repos
      .addCase(fetchTrendingRepos.pending, (state) => {
        state.trending_repos_data.loading = true;
        state.trending_repos_data.error = null;
      })
      .addCase(fetchTrendingRepos.fulfilled, (state, action) => {
        state.trending_repos_data.data = action.payload
          .trendingRepos as GithubRepo[];
        state.trending_repos_data.error = null;
        state.trending_repos_data.loading = false;
      })
      .addCase(fetchTrendingRepos.rejected, (state, action) => {
        state.trending_repos_data.loading = false;
        state.trending_repos_data.error = action.payload as string;
      })
      //  Get Repo details
      .addCase(fetchRepoTrend.pending, (state) => {
        state.repo_data.loading = true;
        state.repo_data.error = null;
      })
      .addCase(fetchRepoTrend.fulfilled, (state, action) => {
        state.repo_data.data.stats = action.payload.repoDetails as any;
        state.repo_data.error = null;
        state.repo_data.loading = false;
      })
      .addCase(fetchRepoTrend.rejected, (state, action) => {
        state.repo_data.loading = false;
        state.repo_data.error = action.payload as string;
      })
      //  Get user activity
      .addCase(fetchUserActivity.pending, (state) => {
        state.userActivityData.loading = true;
        state.userActivityData.error = null;
      })
      .addCase(fetchUserActivity.fulfilled, (state, action) => {
        state.userActivityData.data = action.payload as IUserActivityData;
        state.userActivityData.error = null;
        state.userActivityData.loading = false;
      });
  },
});

export const { setUserActivityData, setSelectedUserRepo, setTrendingRepoList } = githubSlice.actions;
