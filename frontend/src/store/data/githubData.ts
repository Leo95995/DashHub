import type { GithubWidgets } from "../../features/dashboard/types";
import DashboardStorage from "../../services/storage/dashboard";
import type { ItemStatus } from "../../types/common/status";
import type { GithubRepo, IUserActivityData } from "../../types/services/github";


/**
 * DATA FOR GITHUB SERVICES
 */
const trending_repos_data: ItemStatus<GithubRepo[]> = {
  data: [],
  loading: false,
  error: null,
};

export interface SelectedGithubRepo {
  repo: GithubRepo;
  stats: { [key: string]: any };
}

const repo_data: ItemStatus<any> = {
  data: { repo: {} as GithubRepo, stats: {} as any },
  loading: false,
  error: "",
};

const userActivityData: ItemStatus<IUserActivityData> = {
  data: {} as IUserActivityData,
  loading: false,
  error: null,
};

const randomUserData: ItemStatus<any> = {
  data: {} as any,
  loading: false,
  error: null,
};

const selectedWidget :GithubWidgets = DashboardStorage.widgets.githubWidget.getSelectedWidget() ?? "Trending Repositories"

// Exported initial state
export const initialState = {
  trending_repos_data,
  repo_data,
  userActivityData,
  randomUserData,
  selectedWidget: selectedWidget
};
