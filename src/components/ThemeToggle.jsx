"use client";
import {Moon, Sun} from '@gravity-ui/icons';


import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="bg-accent text-primary-foreground px-4 py-2 rounded-full cursor-pointer"
    >
      {theme === "dark" ? <Sun/> : <Moon/>}
    </button>
  );
};

export default ThemeToggle;