import { useTheme } from "../../context/ThemeContext";

const ModeToggler : React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return <button
    className="cursor-pointer border-1  rounded-md border-transparent hover:bg-gray-100 hover:border-gray-200 p-1"
    onClick={toggleTheme}
  >
    {theme === "dark" ? "🌞" : "🌙"}
  </button>;
};

export default ModeToggler;
