import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme-provider";
import { Moon, Sun } from "lucide-react";
const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 support-[background-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* logo */}
        <Link to="/">
          <img src="./logo.svg" alt="brand-logo" className="h-16" />
        </Link>
        {/* search-box */}
        <div>
          <></>
        </div>
        {/* toggle-theme */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`flex items-center cursor-pointer transition-transform duration-500 ${
            theme === "dark" ? "rotate-180" : ""
          }`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-8 w-8 text-yellow-500 rotate-0 trasition-all" />
          ) : (
            <Moon className="h-8 w-8 text-blue-500 rotate-0 trasition-all" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
