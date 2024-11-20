import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [imageSearch, setImageSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToHistory = (query) => {
    if (!query) return;
    setSearchHistory(prev => {
      const newHistory = [
        { query, timestamp: Date.now() },
        ...prev.filter(item => item.query !== query)
      ].slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <Context.Provider
      value={{
        imageSearch,
        setImageSearch,
        darkMode,
        setDarkMode,
        searchHistory,
        addToHistory,
        clearHistory
      }}
    >
      {children}
    </Context.Provider>
  );
};