import { useState } from "react";
import InputSearch from "../../../../components/input/input";
import GenericModal from "../../../../components/modal/modal";
import { useDispatch } from "react-redux";
import ModeToggler from "../../../../components/toggler";
import { setGlobalLoad, setUserInfo } from "../../../../store/appSlice";
interface IFirstVisitModal {
  firstVisit: boolean;
  setFirstVisit: (val: boolean) => void;
  userInfo: any;
}

const FirstVisitModal: React.FC<IFirstVisitModal> = ({
  firstVisit,
  setFirstVisit,
  userInfo,
}) => {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [userData, setUserdata] = useState({ username: userInfo?.username });

  const handleGuestVisit = () => {
    dispatch(setFirstVisit(true) as any);
  };

  const savePreferences = () => {
    setIsWriting(true);
    dispatch(setUserInfo({ userData }));
    setTimeout(() => {
      setIsWriting(false);
      dispatch(setFirstVisit(true) as any);
      dispatch(setGlobalLoad(true));
    }, 1000);
    setTimeout(() => {
      dispatch(setGlobalLoad(false));
    }, 1000);
    dispatch(setGlobalLoad(true));
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
      <div className="rounded-lg p-6 w-full max-w-md mx-auto  flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Ciao!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Inserisci il tuo nome per personalizzare i widget, oppure continua
          come Guest.
        </p>

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
              setUserdata({ ...userData, username: e });
            }}
            width="w-120 md:w-full"
            isLoading={isWriting}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label> Seleziona la modalità</label>
          <div className="w-fit rounded-md border">
            <ModeToggler />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleGuestVisit}
            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Continue as Guest
          </button>
          <button
            onClick={() => {
              savePreferences();
            }}
            className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
          >
            Save and Continue
          </button>
        </div>
      </div>
    </GenericModal>
  );
};
export default FirstVisitModal;
