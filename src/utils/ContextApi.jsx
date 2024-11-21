import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  // Thêm state imageSearch
  const [imageSearch, setImageSearch] = useState(false);

  // Initialize state from localStorage or use default values
  const [theme, setTheme] = useState(() => {
    const savedSettings = localStorage.getItem('searchSettings');
    return savedSettings
      ? JSON.parse(savedSettings).theme
      : 'light';
  });

  const [safeSearch, setSafeSearch] = useState(() => {
    const savedSettings = localStorage.getItem('searchSettings');
    return savedSettings
      ? JSON.parse(savedSettings).safeSearch
      : 'moderate';
  });

  const [language, setLanguage] = useState(() => {
    const savedSettings = localStorage.getItem('searchSettings');
    return savedSettings
      ? JSON.parse(savedSettings).language
      : (navigator.language.startsWith('vi') ? 'vi' : 'en');
  });

  const [notifications, setNotifications] = useState(() => {
    const savedSettings = localStorage.getItem('searchSettings');
    return savedSettings
      ? JSON.parse(savedSettings).notifications
      : true;
  });

  const [searchHistory, setSearchHistory] = useState(() => {
    const savedSettings = localStorage.getItem('searchSettings');
    return savedSettings
      ? JSON.parse(savedSettings).searchHistory
      : true;
  });

  // Effect to update localStorage when settings change
  useEffect(() => {
    const settings = {
      theme,
      safeSearch,
      language,
      notifications,
      searchHistory
    };
    localStorage.setItem('searchSettings', JSON.stringify(settings));

    // Apply theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, safeSearch, language, notifications, searchHistory]);

  // Method to reset all settings to default
  const resetSettings = () => {
    setTheme('light');
    setSafeSearch('moderate');
    setLanguage(navigator.language.startsWith('vi') ? 'vi' : 'en');
    setNotifications(true);
    setSearchHistory(true);
  };

  // Method to add search history
  const addToHistory = (query) => {
    const currentHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistoryItem = { 
      query, 
      timestamp: new Date().toISOString() 
    };
    
    // Prevent duplicates and limit history
    const updatedHistory = [
      newHistoryItem,
      ...currentHistory.filter(item => item.query !== query)
    ].slice(0, 10);

    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // Method to clear search history
  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
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