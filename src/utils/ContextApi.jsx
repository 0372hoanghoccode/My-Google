import { createContext, useState, useEffect } from "react";

// Tạo Context để quản lý trạng thái ứng dụng
export const Context = createContext();

// Component cung cấp Context cho toàn bộ ứng dụng
export const AppContext = ({ children }) => {
  // Trạng thái tìm kiếm hình ảnh
  const [imageSearch, setImageSearch] = useState(false);

  // Khôi phục giao diện từ localStorage hoặc mặc định
  const [theme, setTheme] = useState(() => {
    const caiDatDaLuu = localStorage.getItem('searchSettings');
    return caiDatDaLuu 
      ? JSON.parse(caiDatDaLuu).theme 
      : 'light';
  });

  // Cài đặt tìm kiếm an toàn
  const [safeSearch, setSafeSearch] = useState(() => {
    const caiDatDaLuu = localStorage.getItem('searchSettings');
    return caiDatDaLuu 
      ? JSON.parse(caiDatDaLuu).safeSearch 
      : 'moderate';
  });

  // Ngôn ngữ ứng dụng
  const [language, setLanguage] = useState(() => {
    const caiDatDaLuu = localStorage.getItem('searchSettings');
    return caiDatDaLuu 
      ? JSON.parse(caiDatDaLuu).language 
      : (navigator.language.startsWith('vi') ? 'vi' : 'en');
  });

  // Trạng thái thông báo
  const [notifications, setNotifications] = useState(() => {
    const caiDatDaLuu = localStorage.getItem('searchSettings');
    return caiDatDaLuu 
      ? JSON.parse(caiDatDaLuu).notifications 
      : true;
  });

  // Trạng thái lưu lịch sử tìm kiếm
  const [searchHistory, setSearchHistory] = useState(() => {
    const caiDatDaLuu = localStorage.getItem('searchSettings');
    return caiDatDaLuu 
      ? JSON.parse(caiDatDaLuu).searchHistory 
      : true;
  });

  // Hiệu ứng lưu cài đặt và áp dụng theme
  useEffect(() => {
    const caiDat = {
      theme,
      safeSearch,
      language,
      notifications,
      searchHistory
    };
    localStorage.setItem('searchSettings', JSON.stringify(caiDat));

    // Áp dụng theme dark/light
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
      const lichSuHienTai = JSON.parse(localStorage.getItem('searchHistory') || '[]');

      const mucMoiNhat = {
        query: query.trim(),
        timestamp: new Date().toISOString()
      };

      const lichSuKhongTrung = lichSuHienTai.filter(item => item.query !== query.trim());

      // tối đa 5 mục 
      const lichSuCapNhat = [
        mucMoiNhat,
        ...lichSuKhongTrung
      ].slice(0, 5);

      localStorage.setItem('searchHistory', JSON.stringify(lichSuCapNhat));
    } catch (error) {
      console.error('Lỗi khi thêm vào lịch sử:', error);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Lỗi khi xóa lịch sử:', error);
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