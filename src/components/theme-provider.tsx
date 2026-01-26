import React, { useEffect } from "react";
import { ThemeContext, type Theme } from "@/contexts/theme-context";
import { useLocalStorage } from "react-use";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  useEffect(() =>
    theme == 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  , [theme])

  // Default to dark
  const toggleTheme = () =>
    (theme == 'light')
      ? setTheme('dark')
      : setTheme('light')

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
