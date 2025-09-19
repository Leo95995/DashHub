import { fetchRandomUser } from "../../../../../../../store/githubSlice";
import { useDispatch, useSelector } from "react-redux";
import { Infinity } from "lucide-react";

const RandomUserWidget: React.FC = () => {
  const randomUserData = useSelector(
    (state: any) => state.github.randomUserData
  );
  const { data, loading, error } = randomUserData;
  const dispatch = useDispatch();
  const fetchRandom = () => {
    while (!Object.keys(data).length) {
      dispatch(fetchRandomUser() as any);
    }
  };

  const renderLoading = () => {
    if (loading) {
      return <>Loading </>;
    }
    return <></>;
  };

  const renderError = () => {
    if (error) {
      return <>{error.message}</>;
    }
    return <></>;
  };

  const renderUser = () => {
    console.log(data);
    if (!Object.keys(data).length) {
      return <></>;
    }
    return (
      <div className="max-w-md mx-auto rounded-2xl p-6 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <img
            src={data?.avatar_url}
            alt={data?.login}
            className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-700"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {data?.login}
            </h2>
            <a
              href={data?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              @{data?.login}
            </a>
          </div>
        </div>

        {/* Info dettagliate */}
        <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">ID:</span> {data?.id}
          </p>
          <p>
            <span className="font-semibold">Node ID:</span> {data?.node_id}
          </p>
          <p>
            <span className="font-semibold">Type:</span> {data?.type}
          </p>
          <p>
            <span className="font-semibold">View Type:</span>{" "}
            {data?.user_view_type}
          </p>
          <p>
            <span className="font-semibold">Site Admin:</span>{" "}
            {data?.site_admin ? "✅ Yes" : "❌ No"}
          </p>
        </div>

        {/* Links */}
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
          <a
            href={data?.repos_url}
            className="text-blue-600 dark:text-blue-400 block hover:underline"
            target="_blank"
          >
            📂 Repos
          </a>
          <a
            href={data?.followers_url}
            className="text-blue-600 dark:text-blue-400 block hover:underline"
            target="_blank"
          >
            👥 Followers
          </a>
          <a
            href={data?.following_url?.replace("{/other_user}", "")}
            className="text-blue-600 dark:text-blue-400 block hover:underline"
            target="_blank"
          >
            ➡️ Following
          </a>
          <a
            href={data?.gists_url?.replace("{/gist_id}", "")}
            className="text-blue-600 dark:text-blue-400 block hover:underline"
            target="_blank"
          >
            📝 Gists
          </a>
          <a
            href={data?.starred_url?.replace("{/owner}{/repo}", "")}
            className="text-blue-600 dark:text-blue-400 block hover:underline"
            target="_blank"
          >
            ⭐ Starred
          </a>
          <a
            href={data?.events_url?.replace("{/privacy}", "")}
            className="text-blue-600 dark:text-blue-400 block hover:underline"
            target="_blank"
          >
            🎉 Events
          </a>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <h2 className="font-bold"> Random user widget</h2>
        <button
          className="flex p-2 border gap-2 rounded-2xl w-40"
          onClick={fetchRandom}
        >
          {" "}
          <>Random User</> <Infinity />
        </button>
        {renderError()}
        {renderLoading()}
        {renderUser()}
      </div>
    </>
  );
};

export default RandomUserWidget;
