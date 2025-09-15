import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Safe check for window object
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || "light";
    }
    return "light";
  });

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove("light", "dark");
    
    // Add the current theme
    root.classList.add(theme);
    
    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}
