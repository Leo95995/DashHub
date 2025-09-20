import { githubReposMapper, userActivityMapper } from "../mappers/githubMapper";

const GithubService = () => {
  // Trending repo
  const get_trending_repos = async () => {
    const trendingurl = `https://api.github.com/search/repositories?q=stars:%3E1000&sort=stars&order=desc`;
    try {
      const res = await fetch(trendingurl, { method: "GET" });
      const data = await res.json();
      const status = res.status;

      // map datas to
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

    const repo_detail_url = `https://api.github.com/repos/${encodeURIComponent(
      owner
    )}/${encodeURIComponent(repo)}/languages`;
    try {
      const res = await fetch(repo_detail_url, {
        method: "GET",
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });
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
    const url = `https://api.github.com/users/${username}/events/public`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });
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
      const randomId = Math.floor(Math.random() * 500000000);
      const res = await fetch(
        `https://api.github.com/users?since=${randomId}&per_page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      const status = res.status;
      if (data && status === 200) {
        console.log(data);
        if (!data.length) {
          return { status: status, error: true };
        }
        return { random_user: data[0], status: status, error: false };
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
