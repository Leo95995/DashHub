import { useCallback } from "react";
import InputSearch from "../../../../../../../components/Input/Input";
import { fetchUserActivity } from "../../../../../../../store/githubSlice";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../../../../../../utils/generic-utils";
import type { IUserActivityData } from "../../../../../../../types/services/github";
import type { ItemStatus } from "../../../../../../../types/common/status";
import UserActivityCard from "../../user-activity-card";

const UserActivityWidget: React.FC = () => {
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

  return (
    <>
      <div className="dark:text-white">
        <h2 className="text-xl font-bold dark:text-white text-gray-700">User search widget</h2>
      </div>
      <div className="py-4 flex justify-between">
        <InputSearch
          onChange={onSearchChange}
          placeholder="Search user on github" isLoading={userActivity?.loading}/>
      </div>
      <div className="w-full max-w-4xl min-h-45 rounded-2xl overflow-auto transition-colors">
        <UserActivityCard item={userActivity} />
      </div>
    </>
  );
};

export default UserActivityWidget;
