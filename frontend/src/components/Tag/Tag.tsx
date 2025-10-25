//  React
import type React from "react";
// Types
import type { ITag } from "./types";


const Tag: React.FC<ITag> = ({ text, bgColor, bgHover }) => {
  return (
    <span
      className={`relative inline-block px-3 py-1 rounded-full
        ${bgColor ?? "bg-gradient-to-br from-gray-500 via-gray-200 to-gray-700"} hover:${bgHover ?? "bg-gray-900"}
        text-gray-800 font-medium text-sm w-fit flex items-center
        shadow-sm overflow-hidden
      `}
    >
      {text}
     
    </span>
  );
};

export default Tag;
