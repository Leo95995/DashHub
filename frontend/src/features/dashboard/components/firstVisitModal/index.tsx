import { useState } from "react";
// Components
import InputSearch from "../../../../components/input/input";
import GenericModal from "../../../../components/modal/modal";
import ModeToggler from "../../../../components/toggler";
// Redux
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../../store/appSlice";

interface IFirstVisitModal {
  firstVisit: boolean;
  setFirstVisit: (val: boolean) => void;
}

const FirstVisitModal: React.FC<IFirstVisitModal> = ({
  firstVisit,
  setFirstVisit,
}) => {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [userInfo, setUser] = useState({ username: "", avatar_color: "" });

  const handleGuestVisit = () => {
    dispatch(setUserInfo({ username: "Guest", avatar_color: "red" }));
    dispatch(setFirstVisit(true) as any);
  };

  const savePreferences = () => {
    setIsWriting(true);
    dispatch(setUserInfo(userInfo));
    setTimeout(() => {
      setIsWriting(false);
      dispatch(setFirstVisit(true) as any);
    }, 1000);
  };

  return (
    <GenericModal
      status={{
        open: firstVisit,
        setOpen: () => {},
      }}
      closable={false}
      width="600px"
    >
      <div className="rounded-lg py-6 w-full max-w-md  flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Hi!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Enter your name to personalize the widgets, or continue as a Guest.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="font-medium text-gray-800 dark:text-gray-200"
        >
          Username
        </label>
        <InputSearch
          placeholder="Scrivi qui il tuo nome..."
          onChange={(e) => {
            setUser({ ...userInfo, username: e });
          }}
          width="w-120 md:w-full"
          isLoading={isWriting}
        />
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="font-medium text-gray-800 dark:text-gray-200"
          >
            Avatar Color
          </label>
          <input
            type="color"
            defaultValue={"#e5a50a"}
            onChange={(e) =>
              setUser({ ...userInfo, avatar_color: e.currentTarget.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label> Select mode</label>
          <div className="w-fit rounded-md border">
            <ModeToggler />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            disabled={isWriting}
            onClick={handleGuestVisit}
            className="px-4 py-2 rounded-lg cursor-pointer text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Continue as Guest
          </button>
          <button
            disabled={isWriting}
            onClick={() => {
              savePreferences();
            }}
            className="px-4 py-2 rounded-lg cursor-pointer text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
          >
            Save and Continue
          </button>
        </div>
      </div>
    </GenericModal>
  );
};
export default FirstVisitModal;
