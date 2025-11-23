// Components
import InputSearch from "../../../../components/Input/Input";
import GenericModal from "../../../../components/Modal/Modal";
import ModeToggler from "../../../../components/Toggler/Toggler";
import { validateUsername } from "../../../../utils/validators";
// Redux
import type { IFirstVisitModal } from "./types";
import { useFirstVisitLogic } from "./useFirstVisitLogic";

const FirstVisitModal: React.FC<IFirstVisitModal> = ({ firstVisit }) => {
  // Custom hook
  const { userInfo, setUser, handleGuestVisit, savePreferences, isWriting } =
    useFirstVisitLogic();

  return (
    <GenericModal
      status={{
        open: firstVisit,
        setOpen: () => {},
      }}
      closable={false}
    >
      <div className="rounded-lg py-6 w-full max-w-md  flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Hi!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Add your name and avatar color to personalize the experience or skip
          and use the widgets right away.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <span
          className="font-medium text-gray-800 dark:text-gray-200"
        >
          Username
        </span>
        <InputSearch
          placeholder="Insert here your username..."
          onChange={(e) => {
            setUser({ ...userInfo, username: e });
          }}
          width="w-120 md:w-full"
          isLoading={isWriting}
        />
        {!validateUsername(userInfo?.username) && (
          <p className="text-sm text-red-400">Username too short</p>
        )}
        {validateUsername(userInfo.username) && (
          <p className="text-sm text-green-300">Username valid</p>
        )}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="avatar_color"
            className="font-medium text-gray-800 dark:text-gray-200"
          >
            Avatar Color
          </label>
          <input
            id="avatar_color"
            name="avatar_color"
            type="color"
            onChange={(e) =>
              setUser({ ...userInfo, avatar_color: e.currentTarget.value })
            }
          />
          {!userInfo?.avatar_color?.length && (
            <p className="text-sm text-red-400">No color selected</p>
          )}
          {!!userInfo?.avatar_color?.length && (
            <p className="text-sm text-green-300">Color selected</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label> Select mode</label>
          <div className="w-fit rounded-md border">
            <ModeToggler />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            data-testid="skip_button"
            disabled={isWriting}
            onClick={handleGuestVisit}
            className="px-4 py-2 rounded-lg cursor-pointer text-gray-700  bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300 transition"
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
