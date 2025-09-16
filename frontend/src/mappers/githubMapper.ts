export interface GithubRepo {
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  owner_login: string;
  owner_avatar_url: string;
}

// Interface for user activity mapped result.
export interface IUserActivityData {
  actor_login: string;
  actor_avatar_url: string;
  repo_name: string;
  repo_url: string;
  created_at: string;
  org_login: string;
  org_url: string;
}

export const githubReposMapper = (repos: any[]) => {
  const github_repos_mapped: GithubRepo[] = [];
  for (const repo of repos) {
    const mappedRepo: GithubRepo = {
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.owner.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      updated_at: repo.updated_at,
      owner_login: repo.owner.login,
      owner_avatar_url: repo.owner.avatar_url,
    };

    github_repos_mapped.push(mappedRepo);
  }

  return github_repos_mapped;
};

export const userActivityMapper = (userActivityData: any[]) => {
  const user_activity = userActivityData[0];
  if (userActivityData[0]) {
    let repo_result: IUserActivityData = {
      actor_login: user_activity.actor.login,
      actor_avatar_url: user_activity.actor.avatar_url,
      repo_name: user_activity.repo.name,
      repo_url: user_activity.repo.url,
      created_at: user_activity.created_at,
      org_login: user_activity.org.login,
      org_url: user_activity.org.url,
    };
    return repo_result;
  } else {
    return;
  }
};
