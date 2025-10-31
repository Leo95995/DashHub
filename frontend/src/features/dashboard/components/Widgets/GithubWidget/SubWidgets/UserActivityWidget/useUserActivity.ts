
import { debounce } from "../../../../../../../utils/generic-utils";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserActivity } from "../../../../../../../store/githubSlice";
import type { ItemStatus } from "../../../../../../../types/common/status";
import type { IUserActivityData } from "../../../../../../../types/services/github";

export const useUserActivity = () => {
  const dispatch = useDispatch();
  const userActivity = useSelector(
    (state: any) =>
      state.github.userActivityData as ItemStatus<IUserActivityData>
  );

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm !== "") {
        dispatch(fetchUserActivity(searchTerm) as any);
      }
    }, 1000),
    []
  );

  const onSearchChange = (e: string) => {
    handleSearch(e);
  };

  return {userActivity, onSearchChange};
};
