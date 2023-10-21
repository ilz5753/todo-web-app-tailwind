import { useCallback } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "../contexts/theme";
export default function NavBar() {
  let { switchTheme, activeThemeName, get } = useTheme();
  let { mode = "system" } = get(activeThemeName);
  let isDarkMode = (mode === "system" ? "dark" : mode) === "dark";
  let changeTheme = useCallback(() => {
    switchTheme(
      activeThemeName,
      mode === "system" ? "dark" : mode === "dark" ? "light" : "dark"
    );
  }, [switchTheme, activeThemeName, mode]);
  let Icon = isDarkMode ? FaSun : FaMoon;
  return (
    <div className={`flex flex-col w-full`}>
      <div
        className={`absolute z-10 top-12 right-12 text-1`}
        onClick={changeTheme}
      >
        <Icon className={`text-4xl cursor-pointer`} />
      </div>
      <div
        className={`absolute z-10 top-20 self-center text-center font-extrabold font-sans`}
      >
        <p className={`text-3xl text-2`}>PERSONAL</p>
        <p className={`text-3xl text-2`}>TASK MANAGER</p>
      </div>
    </div>
  );
}
