import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ModeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
    p-2 rounded-md
    flex items-center justify-center
    hover:scale-105 hover:shadow
    transition
    cursor-pointer
    focus:outline-none
  "
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ModeToggler;
