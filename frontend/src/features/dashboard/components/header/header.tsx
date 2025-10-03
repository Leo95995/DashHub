interface IUserData {
  userInfo: any;
  preferences: any;
}

interface IDashBoardHeader {
  userdata: IUserData;
  isEditMode: boolean;
  onClick: (val: boolean) => void;
}

const DashBoardHeader: React.FC<IDashBoardHeader> = ({
  userdata,
  isEditMode,
  onClick,
}) => {
  console.log(userdata, isEditMode);

  return (
    <>
      <div className="flex items-center">
        <div className="text-2xl m-0 px-6 duration-500">
          <b>
            Welcome
            <span className="text-blue-500 dark:text-blue-300 ">
              {userdata?.userInfo?.username ?? " Leo"}
            </span>
          </b>
        </div>
        <button
          onClick={() => onClick(isEditMode)}
          className="px-4 py-2 rounded-lg  cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition"
        >
          Modify Layout
        </button>
      </div>
    </>
  );
};

export default DashBoardHeader;
