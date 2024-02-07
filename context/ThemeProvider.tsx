"use client";
// Use client since we are using context

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: String;
  setMode: (mode: String) => void;
}

// Now creating the context

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Within here we can use any kind of states that we want
  const [mode, setMode] = useState("");

  //   A function to handle theme change
  const handleThemeChange = () => {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.add("light");
    } else {
      setMode("dark");
      document.documentElement.classList.add("dark");
    }
  };

  // useEffect(() => {
  //   handleThemeChange();
  // }, [mode]);

  //   Every provider has to return something and almost always, they return context
  //   Whatever we pass the provider as value will be accessible throughout the app
  //   It will provide the value to all the children that we nest in the <ThemeContext.Provider>
  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>;
}

// To easily utilize the context that we created, we export a function
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
