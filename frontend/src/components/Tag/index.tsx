import type React from "react";

interface ITag {
  text: string;
  bgColor?: string;
  bgHover?: string;
}

const Tag: React.FC<ITag> = ({ text, bgColor, bgHover }) => {
  return (
    <>
      <span
        className={`inline-block px-3 py-1 rounded-full
    ${bgColor ?? `bg-gray-600`} hover:${bgHover ?? `bg-gray-900`}
    text-white font-medium text-sm w-fit flex items-center
    shadow-sm
    transition-colors duration-200`}
      >
        {text}
      </span>
    </>
  );
};
export default Tag;
