// React
import { useState, useEffect } from "react";
// Redux
import { useDispatch } from "react-redux";
// Slice
import { fetchRandomUser } from "../../../../../../../store/githubSlice";
// Types
import type { GithubFields } from "../../types";
import { IGlobalAlertStatus } from "../../../../../../../types/store/app";
// Status
import type { ItemStatus } from "../../../../../../../types/common/status";
// Hooks
import { useGlobalAlert } from "../../../../../../../hooks/useAlert";

export const useRandomUser = ({
  randomUserData,
}: {
  randomUserData: ItemStatus<any>;
}) => {
  const dispatch = useDispatch();
  const [ghLinks, setGhlinks] = useState<GithubFields>();
  const { handleAlert } = useGlobalAlert()

  useEffect(() => {
    generateUrls();
  }, [randomUserData]);
//   Fetch random Data
  const fetchRandomData = async () => {
    await dispatch(fetchRandomUser() as any);
    handleAlert(
      IGlobalAlertStatus.SUCCESS,
      "Success",
      "User loaded with success"
    );
  };
//  Generate url
  const generateUrls = () => {
    const githubLinks: GithubFields = {
      repositories: "",
      followers: "",
      following: "",
      stars: "",
      gists: "",
    };
    if (!randomUserData?.data?.login) return;
    const username = randomUserData?.data?.login;

    Object.keys(githubLinks).forEach((e) => {
      const key = e;
      const baseurl = `https://github.com/${username}?tab=${key}`;

      githubLinks[e as keyof GithubFields] = baseurl;
    });
    setGhlinks(githubLinks);
  };

  return { ghLinks, fetchRandomData };
};
