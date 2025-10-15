import { useEffect, useState } from "react";
import LoaderWithMessage from "../../../../../../components/loader/loaderAndText";
import type { CMEData } from "../../../../../../store/interfaces/interfaces";
import type { ArrowKey } from "../../../../../../interfaces/common/interfaces";

export interface ICmeWidget {
  cme_data: CMEData[];
  loading: boolean;
  error: string | null;
}

const Cme_Widget: React.FC<ICmeWidget> = ({
  cme_data = [],
  error,
  loading,
}) => {
  const [selectedCme, setSelectedCme] = useState<{
    data: CMEData | null;
    index: number;
  }>({
    data: cme_data[0] ?? null,
    index: 0,
  });

  useEffect(() => {
    setSelectedCme({ data: cme_data[0], index: 0 });
  }, [cme_data]);

  if (error) {
    return <>Errore nel caricamento</>;
  }

  if (loading) {
    return <LoaderWithMessage text=" Loading Cme..." />;
  }

  const changeWidget = (currentIndex: number, direction: ArrowKey) => {
    if (direction === "prev" && currentIndex > 1) {
      setSelectedCme({
        data: cme_data[selectedCme.index - 1] as any,
        index: selectedCme.index - 1,
      });
    } else if (direction === "next" && currentIndex < cme_data.length) {
      setSelectedCme({
        data: cme_data[selectedCme.index + 1] as any,
        index: selectedCme.index + 1,
      });
    }
  };

  if (!selectedCme.data) {
    return <>no data still</>;
  }

  const { data } = selectedCme;

  return (
    <div className="py-2 text-md relative">
      <div className="absolute bottom-102 right-4">
        <a
          href={data?.link}
          target="_blank"
          className="ml-1 px-5 py-2 text-sm rounded-md cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 text-white  hover:scale-105 hover:shadow-2xl transition-all duration-300 transform active:scale-95"
        >
          More info
        </a>
      </div>

      <div className="flex justify-between items-center gap-4 mb-6">
        <b className="flex gap-2 items-center text-lg">
          Total CME
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1  rounded-full font-semibold">
            {cme_data.length}
          </span>
        </b>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Selected CME <b>{selectedCme?.index ? selectedCme.index + 1 : 1}</b>{" "}
          of <b>{cme_data.length}</b>
        </p>
      </div>

      {/* CME Content */}
      <div
        key={data.id}
        className="w-full flex flex-col gap-3 p-5 rounded-xl transition-all duration-500 transform "
      >
        <h2 className="font-extrabold text-lg text-gray-800 dark:text-gray-100">
          {data.id}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          <p className="w-50 text-nowrap ">
            <span className="font-semibold ">Start:</span>{" "}
            {new Date(data.startTime).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Speed:</span> {data.speed} km/s
          </p>
          <p>
            <span className="font-semibold">Type:</span> {data.type}
          </p>
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {data.sourceLocation}
          </p>
        </div>

        <p className="mt-3 text-gray-700 dark:text-gray-200 text-sm line-clamp-3">
          {data.note}
        </p>

        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Impact Earth:</span>{" "}
            {data.impact.earth ? "Yes" : "No"}
          </p>
          {data.impact.eta && (
            <p>
              <span className="font-semibold">ETA:</span> {data.impact.eta}
            </p>
          )}
          {data.impact.kpIndex && (
            <p>
              <span className="font-semibold">KP Index:</span>{" "}
              {data.impact.kpIndex}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-5">
          <button
            onClick={() =>
              changeWidget((selectedCme?.index as number) + 1, "prev")
            }
            className="px-4 py-2 rounded-md cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:scale-105 active:scale-95 transition-all duration-300 transform"
          >
            Back
          </button>
          <button
            onClick={() => changeWidget(selectedCme?.index + 1, "next")}
            className="px-5 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95 transition-all duration-300 transform"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cme_Widget;
