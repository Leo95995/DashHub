import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFullScreenImage } from "../../../store/nasaSlice";

const useFullScreenApod = (): React.ReactElement | null => {
  const dispatch = useDispatch();

  const { url, isFullScreen } = useSelector(
    (state: any) => state.nasa.apodStatus.fullScreenImage
  );

  if (!isFullScreen || url === null) return null;

  return (
    <div
      onClick={() =>
        dispatch(setFullScreenImage({ isFullScreen: false, url: null }))
      }
      className="fixed inset-0 z-[999999] bg-black/90 py-10 rounded-xs flex items-center justify-center cursor-zoom-out"
    >
      <img
        src={url}
        alt="Fullscreen"
        fetchPriority="high"
        className="max-w-full max-h-full object-contain rounded-xl border border-transparent hover:border-white/30 transition-all duration-400 hover:scale-105"
      />
      <div className="absolute -inset-2 rounded-xl pointer-events-none border border-white/20 shadow-[0_0_40px_10px_rgba(255,255,255,0.1)]"></div>
    </div>
  );
};

export { useFullScreenApod };
