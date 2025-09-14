import type React from "react";
import GithubService from "../../../../../services/github-service";
import { useEffect, useState } from "react";
import type { GithubRepo } from "../../../../../mappers/githubMapper";
import GithubElement from "./github-element";
import { BadgeAlert, GitFork, Star } from "lucide-react";
import type { githubSteps } from "./interfaces/interface";

const GithubWidget: React.FC = () => {
  /**
   * First iteration just for training purpose.
   */

  const [trendingRepos, setTrendingRepos] = useState<GithubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<{
    repo: GithubRepo;
    stats: { [key: string]: any };
  }>();
  const [step, setStep] = useState<githubSteps>(1);
  const { get_trending_repos, get_repo_trend } = GithubService();

  useEffect(() => {
    get_repos();
  }, []);

  const getRepoDetails = async (repo: GithubRepo) => {
    const repodata = await get_repo_trend(repo.full_name);
    if (repodata) {
      setSelectedRepo({ repo: repo, stats: repodata.repoDetails });
      setStep(2);
    }
  };

  const get_repos = async () => {
    const data = await get_trending_repos();
    if (!data.trendingRepos) {
      return;
    }
    setTrendingRepos(data?.trendingRepos);
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
    }
  };

  const step1 = () => {
    return (
      <>
        <h3 className="text-xl font-semibold py-2 px-2">
          Github most popular repos
        </h3>
        <ul className="grid lg:grid-cols-1 gap-4 px-2 py-2 overflow-y-scroll overflow-x-scroll  max-h-100">
          {trendingRepos?.map((repo: GithubRepo) => (
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
                  <span className="text-gray-700 text-sm font-medium">
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
          <b> {selectedRepo?.repo.full_name} Data</b>
        </div>
        <GithubElement object={selectedRepo?.stats ?? {}} />
      </>
    );
  };

  return (
    <>
      <div className="col-span-1 rounded-lg p-6 shadow-lg ">
        {renderCurrentStep()}
      </div>
    </>
  );
};

export default GithubWidget;
