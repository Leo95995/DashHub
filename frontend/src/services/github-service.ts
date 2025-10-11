// Mappers
import { githubReposMapper, userActivityMapper } from "../mappers/githubMapper";

const backendUrl = `${import.meta.env.VITE_BACKEND_URI}/github`;

const GithubService = () => {

  const get_trending_repos = async () => {
    const trendingurl = `${backendUrl}/trending_repos`;
    try {
      const res = await fetch(trendingurl, { method: "GET" });
      const data = await res.json();
      const status = res.status;
      const mappedRepos = await githubReposMapper(data.items);
      if (data && status === 200) {
        return { trendingRepos: mappedRepos, status: status, error: false };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  const get_repo_trend = async (repoName: string) => {
    const [owner, repo] = repoName.split("/");

    const repo_detail_url = `${backendUrl}/repo_trend?owner=${owner}&repo=${repo}`;
    try {
      const res = await fetch(repo_detail_url, { method: "GET" });
      const data = await res.json();
      const status = res.status;

      if (data && status === 200) {
        return { repoDetails: data, status: status, error: false };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  const get_user_activity = async (username: string) => {
    const url = `${backendUrl}/user_activity?username=${username}`;
    try {
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      const status = res.status;
      const user_activity = userActivityMapper(data);

      if (data && status === 200) {
        return { user_activity: user_activity, status: status, error: false };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  const get_random_user = async () => {
    try {
      const res = await fetch(`${backendUrl}/random-user`, { method: "GET" });
      const data = await res.json();
      const status = res.status;

      if (data && status === 200) {
        if (!data) {
          return { status: status, error: true };
        }
        return { random_user: data, status: status, error: false };
      } else {
        return { status: status, error: true };
      }
    } catch (error) {
      return { error: true };
    }
  };

  return {
    get_trending_repos,
    get_repo_trend,
    get_user_activity,
    get_random_user,
  };
};

export default GithubService;
