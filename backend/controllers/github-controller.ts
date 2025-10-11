import { NextFunction, Request, Response } from "express";
const GITHUB_API = process.env.GITHUB_TOKEN;

// Trending repos
const get_trending_repos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trendingurl = `https://api.github.com/search/repositories?q=stars:%3E1000&sort=stars&order=desc`;
  try {
    const trending_data = await fetch(trendingurl, {
      method: "GET",
      headers: { Authorization: `token ${GITHUB_API}` },
    });
    if (trending_data.status === 200 && trending_data) {
      const result = await trending_data.json();
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(404).json("Error");
  }
};

// Get repo trend
const get_repo_trend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const { owner, repo } = query;

  const repo_detail_url = `https://api.github.com/repos/${encodeURIComponent(
    owner as string
  )}/${encodeURIComponent(repo as string)}/languages`;
  try {
    const repo_data = await fetch(repo_detail_url, {
      method: "GET",
      headers: {
        Authorization: `token ${GITHUB_API}`,
      },
    });

    const data = await repo_data.json()

    res.status(200).json(data);
  } catch (e) {
    res.status(404).json("Error");
  }
};

// Get user activity
const get_user_activity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const { username } = query;

  console.log(username);

  const url = `https://api.github.com/users/${username}/events/public`;
  try {
    const user_activity = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${GITHUB_API}`,
      },
    });

    const user_info = await user_activity.json();

    res.status(200).json(user_info);
  } catch (error) {
    res.status(500).json("ERROR");
  }
};

const get_random_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userDetails: any = null;
    let attempts = 0;
    while (!userDetails && attempts < 50) {
      attempts++;
      const randomId = Math.floor(Math.random() * 500000000);
      const response = await fetch(
        `https://api.github.com/users?since=${randomId}&per_page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${GITHUB_API}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        if (data && data.length > 0) {
          userDetails = data[0]; 
        }
      }
    }

    if (userDetails) {
      res.status(200).json(userDetails);
    } else {
      res.status(404).json({ error: "No user found after multiple attempts" });
    }
  } catch (e) {
    res.status(500).json({ error: "ERROR ACCIO", details: e });
  }
};

export const GithubController = {
  get_trending_repos,
  get_repo_trend,
  get_user_activity,
  get_random_user,
};
