import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [imageSearch, setImageSearch] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings
      ? JSON.parse(savedSettings).theme
      : 'light';
  });

  const [safeSearch, setSafeSearch] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings
      ? JSON.parse(savedSettings).safeSearch
      : 'moderate';
  });

  const [language, setLanguage] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings
      ? JSON.parse(savedSettings).language
      : (navigator.language.startsWith('vi') ? 'vi' : 'en');
  });

  const [notifications, setNotifications] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings
      ? JSON.parse(savedSettings).notifications
      : true;
  });

  const [searchHistory, setSearchHistory] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings
      ? JSON.parse(savedSettings).searchHistory
      : true;
  });

  useEffect(() => {
    const settings = {
      theme,
      safeSearch,
      language,
      notifications,
      searchHistory
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, safeSearch, language, notifications, searchHistory]);

  const resetSettings = () => {
    setTheme('light');
    setSafeSearch('moderate');
    setLanguage(navigator.language.startsWith('vi') ? 'vi' : 'en');
    setNotifications(true);
    setSearchHistory(true);
  };

  const addToHistory = (query) => {
    if (!searchHistory || !query?.trim()) return;

    try {
      const currentHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

      const newEntry = {
        query: query.trim(),
        timestamp: new Date().toISOString()
      };

      const uniqueHistory = currentHistory.filter(item => item.query !== query.trim());

      const updatedHistory = [
        newEntry,
        ...uniqueHistory
      ].slice(0, 5);

      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        safeSearch,
        setSafeSearch,
        language,
        setLanguage,
        notifications,
        setNotifications,
        searchHistory,
        setSearchHistory,
        imageSearch,
        setImageSearch,
        resetSettings,
        addToHistory,
        clearHistory
      }}
    >
      {children}
    </Context.Provider>
  );
};
