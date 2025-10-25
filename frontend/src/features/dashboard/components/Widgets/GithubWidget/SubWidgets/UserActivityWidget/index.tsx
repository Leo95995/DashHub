//  Components
import InputSearch from "../../../../../../../components/Input/Input";
import UserActivityCard from "../../user-activity-card";
//  Hooks
import { useUserActivity } from "./useUserActivity";

const UserActivityWidget: React.FC = () => {


  const { userActivity, onSearchChange } = useUserActivity()

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
