import {
  Github,
  Building2,
  Star,
  GitBranch,
  FileText,
  Home,
  Clock,
  UserRound,
} from "lucide-react";
import ReactLoader from "../../../../../../components/loader";
import type { IUserActivityData } from "../../../../../../mappers/githubMapper";
import type { ItemStatus } from "../../../../../../store/interfaces/interfaces";
import ErrorMessage from "../../../../../../components/Error/error";

const UserActivityCard: React.FC<{ item: ItemStatus<IUserActivityData> }> = ({
  item,
}) => {
  const { data, loading: loadUser, error: errorUser } = item;

  const userActivityData = data as IUserActivityData;

  const renderError = () => {
    if (!errorUser) {
      return;
    }

    return (
      <ErrorMessage message="No public data found for the selected GitHub user. Please check the username or try another user." />
    );
  };

  const renderLoading = () => {
    if (!loadUser) {
      return;
    }

    return (
      <>
        <div className="flex gap-2 flex-direction h-full flex-col items-center min-h-40 justify-center">
          <div> Caricamento utente</div>
          <div>
            <ReactLoader />
          </div>
        </div>
      </>
    );
  };

  const renderUserActivity = () => {
    if (errorUser || loadUser) {
      return <></>;
    }

    if (!Object.keys(userActivityData)?.length) {
      return (
        <div className="flex flex-col w-full h-[200px] items-center justify-center gap-4 text-center dark:text-white text-gray-700 font-bold">
          <UserRound className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          <span>No user selected</span>
        </div>
      );
    }

    return (
      <>
        <div>
          <img
            src={userActivityData.actor_avatar_url}
            alt={userActivityData.actor_login}
            className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {userActivityData.actor_login}
            </h3>
            <span className="text-gray-500 dark:text-gray-400">
              {userActivityData.event_type}
            </span>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Repository
              </span>
              <a
                href={userActivityData.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                {userActivityData.repo_name}
              </a>
              {userActivityData.repo_description && (
                <span className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {userActivityData.repo_description}
                </span>
              )}
              {userActivityData.repo_language && (
                <span className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                  Language: {userActivityData.repo_language}
                </span>
              )}
            </div>
          </div>
          {userActivityData.fork_name && (
            <div className="flex items-start gap-3 mb-4">
              <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Fork
                </span>
                <a
                  href={userActivityData.fork_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {userActivityData.fork_name}
                </a>
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  {userActivityData.fork_private ? "Private" : "Public"}
                </span>
              </div>
            </div>
          )}
          {userActivityData.org_login && (
            <div className="flex items-start gap-3 mb-4">
              <Building2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Organization
                </span>
                <a
                  href={userActivityData.org_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {userActivityData.org_login}
                </a>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
            {userActivityData.repo_stargazers_count !== undefined && (
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{userActivityData.repo_stargazers_count} stars</span>
              </div>
            )}
            {userActivityData.repo_forks_count !== undefined && (
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-gray-500" />
                <span>{userActivityData.repo_forks_count} forks</span>
              </div>
            )}
            {userActivityData.repo_size_kb !== undefined && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>Size: {userActivityData.repo_size_kb} KB</span>
              </div>
            )}
            {userActivityData.repo_default_branch && (
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-gray-500" />
                <span>
                  Default branch: {userActivityData.repo_default_branch}
                </span>
              </div>
            )}
            {userActivityData.repo_license_name && (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>License: {userActivityData.repo_license_name}</span>
              </div>
            )}
            {userActivityData.repo_homepage && (
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-gray-500" />
                <a
                  href={userActivityData.repo_homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Homepage
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              Created at:{" "}
              {new Date(userActivityData.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex items-center  gap-4 mb-6">
        {loadUser ||
          (errorUser !== null && (
            <div className="flex w-full items-center justify-center">
              {renderError()}
              {renderLoading()}
            </div>
          ))}
        {renderUserActivity()}
      </div>
    </>
  );
};

export default UserActivityCard;
