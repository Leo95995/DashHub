// Dashboard data
import DashboardStorage from "../../../../services/storage/dashboard";
interface IUserData {
  userInfo: any;
  preferences: any;
}

interface IDashBoardHeader {
  userData: IUserData;
  isEditMode: boolean;
  onClick: (val: boolean) => void;
  widgetOrder: number[];
}

const DashBoardHeader: React.FC<IDashBoardHeader> = ({
  userData,
  isEditMode,
  onClick,
  widgetOrder,
}) => {
  return (
    <>
      <div className="flex  flex-col md:flex-row px-6 gap-5  ">
        <div className="text-2xl m-0 duration-500">
          <b>
            Welcome
            <span className="text-blue-500 dark:text-blue-300 ">
              {userData?.userInfo?.username
                ? " " + userData?.userInfo?.username
                : " Guest"}
            </span>
          </b>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onClick(isEditMode)}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-200 active:scale-95 cursor-pointer
  ${
    isEditMode
      ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-300"
      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md"
  }
`}
          >
            {isEditMode ? `Cancel` : "Edit Layout (Drag & Drop)"}
          </button>
          {isEditMode && (
            <button
              onClick={() => {
                DashboardStorage.widgets.saveWidgetOrder(widgetOrder);
                onClick(isEditMode);
              }}
              className="px-4 py-2 rounded-lg  cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition"
            >
             Finish Editing
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DashBoardHeader;
