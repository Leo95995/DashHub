import { useEffect, useState } from "react";
import type {
  GithubRepo,
  IUserActivityData,
} from "../../../../../../../mappers/githubMapper";
import { BadgeAlert, GitFork, Loader, Star } from "lucide-react";
import type { githubSteps } from "../../interfaces/interface";
import GithubElement from "./github-element";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingRepos,
  fetchRepoTrend,
  fetchUserActivity,
} from "../../../../../../../store/githubSlice";
import { Github, Building2, Clock,  GitBranch, FileText, Home } from "lucide-react";


import { setSelectedUserRepo } from "../../../../../../../store/githubSlice";
import { ArrowBack } from "@mui/icons-material";
import ReactLoader from "../../../../../../../components/loader";

const PopularReposWidget: React.FC = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState<githubSteps>(1);
  // Trending repositories
  const trending_repositories = useSelector(
    (state: any) => state.github.trending_repos_data
  );
  const {
    data: trendingData,
    loading: loadTrending,
    error: errorTrending,
  } = trending_repositories;
  // Selected repo datas
  const selectedRepo = useSelector((state: any) => state.github.repo_data);
  const { data: repoData, loading: loadRepo, error: errorRepo } = selectedRepo;
  // User activities
  const userActivity = useSelector(
    (state: any) =>
      state.github.userActivityData as {
        data: IUserActivityData;
        loading: boolean;
        error: string | null;
      }
  );
  const {
    data: userActivityData,
    loading: loadUser,
    error: errorUser,
  } = userActivity;

  useEffect(() => {
    console.log(userActivityData);
  }, [userActivityData]);

  useEffect(() => {
    dispatch(fetchTrendingRepos() as any);
  }, []);

  const getRepoDetails = async (repo: GithubRepo) => {
    await dispatch(fetchRepoTrend(repo.full_name) as any);
    if (repoData) {
      setSelectedUserRepo({ repo: repo, stats: repoData.stats });
      setStep(2);
    }
  };

  const renderCurrentStep = () => {
    if (!step) {
      return <></>;
    }

    switch (step) {
      case 1:
        return step1();
      case 2:
        return step2();
      case "user-activity":
        return renderUserActivity();
    }
  };



const renderUserActivity = () => {
  if(errorUser){
    return <>Error</>
  }
  if(loadUser){
    return <><div className="flex flex-direction h-full flex-col justify-center"> Caricamento utente <ReactLoader/></div></>
  }


  return (
    <div className="w-full max-w-4xl  rounded-2xl p-6 overflow-auto transition-colors">
      <div> <button className="cursor-pointer" onClick={()=> setStep(1)}> <ArrowBack/></button></div>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={userActivityData.actor_avatar_url}
          alt={userActivityData.actor_login}
          className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-700"
        />
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {userActivityData.actor_login}
          </h3>
          <span className="text-gray-500 dark:text-gray-400">{userActivityData.event_type}</span>
        </div>
      </div>

      {/* Repository principale */}
      <div className="flex items-start gap-3 mb-4">
        <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
        <div className="flex flex-col">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Repository</span>
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

      {/* Fork creato dall'utente */}
      {userActivityData.fork_name && (
        <div className="flex items-start gap-3 mb-4">
          <Github className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Fork</span>
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

      {/* Organizzazione */}
      {userActivityData.org_login && (
        <div className="flex items-start gap-3 mb-4">
          <Building2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Organization</span>
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

      {/* Dettagli repo */}
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
            <span>Default branch: {userActivityData.repo_default_branch}</span>
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

      {/* Data evento */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Clock className="w-4 h-4" />
        <span>Created at: {new Date(userActivityData.created_at).toLocaleString()}</span>
      </div>
    </div>
  );
};


  const step1 = () => {
    return (
      <>
        <h3 className="text-xl font-semibold py-2 px-2">
          Github most popular repos
        </h3>
        <ul className="grid lg:grid-cols-1 gap-4 px-2 py-2 overflow-y-scroll overflow-x-scroll  max-h-100">
          {trendingData?.map((repo: GithubRepo) => (
            <li
              key={repo.html_url}
              className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-200 bg-white flex flex-col space-y-3"
            >
              <div className="flex items-center justify-between">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {repo.full_name}
                </a>
                {repo.language && (
                  <span className="text-sm px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                    {repo.language}
                  </span>
                )}
              </div>
              {repo.description && (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {repo.description}
                </p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star /> <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork /> <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BadgeAlert /> <span>{repo.open_issues_count}</span>
                  </div>
                </div>
                <span className="text-xs">
                  {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center  gap-10 space-x-2 mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={repo.owner_avatar_url}
                    alt={repo.owner_login}
                    loading="lazy"
                    className="w-8 h-8 rounded-full"
                  />
                  <span
                    onClick={() => {
                      dispatch(fetchUserActivity(repo.owner_login) as any);
                      setStep("user-activity");
                    }}
                    className="text-gray-700 cursor-pointer hover:text-blue-600 hover:underline text-sm font-medium"
                  >
                    {repo.owner_login}
                  </span>
                </div>
                <button
                  className="px-3 py-2 rounded-md text-white font-bold text-xs 
             bg-gradient-to-r from-indigo-500 to-indigo-700
             shadow-md hover:from-indigo-600  hover:to-indigo-900
             active:scale-95 transition-all duration-300 cursor-pointer"
                  onClick={() => getRepoDetails(repo)}
                >
                  Statistics
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const step2 = () => {
    return (
      <>
        <div className="flex flex-col justify-start items-start">
          <button
            className="px-3 py-2 rounded-md text-white font-bold text-xs 
             bg-gradient-to-r from-indigo-500 to-indigo-700
             shadow-md hover:from-indigo-600  hover:to-indigo-900
             active:scale-95 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setStep(1);
            }}
          >
            Go Back
          </button>
          <b> {repoData?.repo.full_name} Data</b>
        </div>
        <GithubElement object={repoData?.stats ?? {}} />
      </>
    );
  };

  return <>{renderCurrentStep()}</>;
};

export default PopularReposWidget;
