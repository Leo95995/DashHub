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
  // Utente
  actor_login: string;
  actor_avatar_url: string;
  actor_url: string; // link al profilo GitHub
  actor_type: string; // User / Bot
  site_admin: boolean;
  // Evento
  event_type: string; // ForkEvent, PushEvent, ecc.
  created_at: string;
  public: boolean; // visibilità dell'evento
  // Repository originale
  repo_name: string;
  repo_url: string;
  repo_description: string;
  repo_language: string | null;
  repo_stargazers_count: number;
  repo_forks_count: number;
  repo_size_kb: number;
  repo_default_branch: string;
  repo_license_name: string;
  repo_homepage: string;
  // Fork creato dall'utente (se presente)
  fork_name?: string;
  fork_url?: string;
  fork_private?: boolean;
  // Organizzazione
  org_login?: string;
  org_url?: string;
  org_avatar_url?: string;
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

  console.log(userActivityData[0]);
  if (userActivityData[0]) {
    let repo_result: IUserActivityData = {
      // Utente
      actor_login: user_activity.actor.login,
      actor_avatar_url: user_activity.actor.avatar_url,
      actor_url: user_activity.actor.url,
      actor_type: user_activity.actor.type,
      site_admin: user_activity.actor.site_admin,

      // Evento
      event_type: user_activity.type,
      created_at: user_activity.created_at,
      public: user_activity.public,

      // Repository originale
      repo_name: user_activity.repo.name,
      repo_url: user_activity.repo.url,
      repo_description: user_activity.payload?.forkee?.description || "",
      repo_language: user_activity.payload?.forkee?.language || null,
      repo_stargazers_count:
        user_activity.payload?.forkee?.stargazers_count || 0,
      repo_forks_count: user_activity.payload?.forkee?.forks_count || 0,
      repo_size_kb: user_activity.payload?.forkee?.size || 0,
      repo_default_branch: user_activity.payload?.forkee?.default_branch || "",
      repo_license_name: user_activity.payload?.forkee?.license?.name || "",
      repo_homepage: user_activity.payload?.forkee?.homepage || "",

      // Fork creato dall'utente (se presente)
      fork_name: user_activity.payload?.forkee?.full_name || "",
      fork_url: user_activity.payload?.forkee?.html_url || "",
      fork_private: user_activity.payload?.forkee?.private || false,

      // Organizzazione
      org_login: user_activity.org?.login || "",
      org_url: user_activity.org?.url || "",
      org_avatar_url: user_activity.org?.avatar_url || "",
    };

    return repo_result;
  } else {
    return;
  }
};
