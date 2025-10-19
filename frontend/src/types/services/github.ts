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
  actor_url: string; 
  actor_type: string; 
  site_admin: boolean;
  event_type: string; 
  created_at: string;
  public: boolean; 
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
  fork_name?: string;
  fork_url?: string;
  fork_private?: boolean;
  org_login?: string;
  org_url?: string;
  org_avatar_url?: string;
}


export interface RandomUserProps {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}