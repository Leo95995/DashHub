import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRandomUser } from "../../../../../../../store/githubSlice";
import type { GithubFields } from "../../types";
import type { ItemStatus } from "../../../../../../../types/common/status";
import { useGlobalAlert } from "../../../../../../../hooks/useAlert";
import { IGlobalAlertStatus } from "../../../../../../../types/store/app";

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
