import { fetchRandomUser } from "../../../../../../../store/githubSlice";
import { useDispatch, useSelector } from "react-redux";
import { Ban, Infinity } from "lucide-react";
import LoaderWithMessage from "../../../../../../../components/loader/loaderAndText";
import ErrorMessage from "../../../../../../../components/Error/error";
import { useEffect, useState } from "react";

type GithubFields = Record<
  "repositories" | "followers" | "following" | "stars" | "gists",
  string
>;

const RandomUserWidget: React.FC = () => {
  const randomUserData = useSelector(
    (state: any) => state.github.randomUserData
  );
  const { data, loading, error } = randomUserData;
  const dispatch = useDispatch();
  const [gh_links, set_ghlinks] = useState<GithubFields>();

  useEffect(() => {
    generateUrls();
  }, [randomUserData]);

  const fetchRandomUntilData = async () => {
    let tries = 0;
    const maxTries = 10;

    while (tries < maxTries) {
      const result = await dispatch(fetchRandomUser() as any);
      if (!result.error) {
        break;
      }
      tries++;
      await new Promise((r) => setTimeout(r, 500));
    }
  };

  const renderLoading = () => {
    if (loading) {
      return <LoaderWithMessage text="Loading datas" />;
    }
    return <></>;
  };

  const generateUrls = () => {
    // Link github

    // Object.keys(randomUserData.data).map((urls: any) => {
    //   const key = urls;
    //   const value = randomUserData.data[urls];
    //   console.log(value.toString());
    //   if (
    //     value.toString().includes("https://api.github.com") &&
    //     githubLinks.hasOwnProperty(key)
    //   ) {
    //     const newVal = value.replace(
    //       "https://api.github.com/users",
    //       "https://github.com"
    //     );
    //     githubLinks[key as keyof GithubFields] = newVal;
    //   }
    // });

    const githubLinks: GithubFields = {
      repositories: "",
      followers: "",
      following: "",
      stars: "",
      gists: "",
    };
    const username = randomUserData.data.login;
    Object.keys(githubLinks).map((e) => {
      const key = e;
      const baseurl = `https://github.com/${username}?tab=${key}`;

      githubLinks[e as keyof GithubFields] = baseurl;
    });


    set_ghlinks(githubLinks);
  };

  const renderError = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center transition duration-300 h-40 gap-2">
          <Ban />
          <div>{error}</div>
          <div> Trying to fetch again another user</div>
        </div>
      );
    }
    return <></>;
  };

  const renderUser = () => {
    if (loading) {
      return <></>;
    }
    if (error) {
      return <></>;
    }

    if (!Object.keys(data).length) {
      return (
        <>
          <ErrorMessage
            customTitle="No user selected "
            message={"click on the button to display a random github user!!"}
          />
        </>
      );
    }
    return (
      <div className="rounded-2xl min-h-40  transition-opacity duration-500 py-6 min-w-fit ">
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
        <div className="flex items-center justify-around gap-4 mt-4">
          <div className=" space-y-2 text-sm text-gray-700 dark:text-gray-300">
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
          <div className=" border-gray-200 dark:border-gray-700 ">
            <a
              href={gh_links?.repositories}
              className="text-blue-600 dark:text-blue-400 block hover:underline"
              target="_blank"
            >
              📂 Repos
            </a>
            <a
              href={gh_links?.followers}
              className="text-blue-600 dark:text-blue-400 block hover:underline"
              target="_blank"
            >
              👥 Followers
            </a>
            <a
              href={gh_links?.following}
              className="text-blue-600 dark:text-blue-400 block hover:underline"
              target="_blank"
            >
              ➡️ Following
            </a>
            <a
              href={gh_links?.gists}
              className="text-blue-600 dark:text-blue-400 block hover:underline"
              target="_blank"
            >
              📝 Gists
            </a>
            <a
              href={gh_links?.stars}
              className="text-blue-600 dark:text-blue-400 block hover:underline"
              target="_blank"
            >
              ⭐ Starred
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="items-center flex justify-center gap-4 flex-col">
          <h2 className="font-bold text-2xl"> Random user widget</h2>
          <button
            onClick={fetchRandomUntilData}
            className="flex cursor-pointer items-center justify-between hover:scale-110 active:scale-95 w-40 px-4 py-2 rounded-2xl bg-gradient-to-r from-gray-800 to-red-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span>Random User</span>
            <Infinity className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-2 min-h-40 items-center">
          {renderLoading()}
          {renderError()}
          {renderUser()}
        </div>
      </div>
    </>
  );
};

export default RandomUserWidget;
