import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ModeToggler : React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return <button
    className="cursor-pointer border-1 rounded-md border-transparent  hover:border-gray-200 p-1"
    onClick={toggleTheme}
  >
    {theme === "dark" ?  <Sun/>: <Moon/>}
  </button>;
};

export default ModeToggler;
