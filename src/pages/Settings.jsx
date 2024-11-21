import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../utils/ContextApi';
import { 
  Sun, 
  Moon, 
  Globe, 
  Shield, 
  History, 
  Bell, 
  Search, 
  RotateCcw 
} from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const {
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
    clearHistory
  } = useContext(Context);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearHistory = () => {
    clearHistory();
    setShowConfirm(false);
  };

  const handleSave = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {language === 'vi' ? 'Cài đặt tìm kiếm' : 'Search Settings'}
          </h1>
        </div>

        {/* Settings Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
          {/* Theme Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'light' ? 
                <Sun className="w-5 h-5 text-amber-500" /> : 
                <Moon className="w-5 h-5 text-blue-500" />
              }
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {language === 'vi' ? 'Giao diện' : 'Theme'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'vi' ? 'Chọn giao diện bạn muốn' : 'Choose your preferred theme'}
                </p>
              </div>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-0 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">{language === 'vi' ? 'Sáng' : 'Light'}</option>
              <option value="dark">{language === 'vi' ? 'Tối' : 'Dark'}</option>
            </select>
          </div>

          {/* Language Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-green-500" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {language === 'vi' ? 'Ngôn ngữ' : 'Language'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'vi' ? 'Chọn ngôn ngữ hiển thị' : 'Select display language'}
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-0 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* SafeSearch Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-red-500" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {language === 'vi' ? 'Tìm kiếm an toàn' : 'SafeSearch'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'vi' ? 'Lọc nội dung không phù hợp' : 'Filter explicit content'}
                </p>
              </div>
            </div>
            <select
              value={safeSearch}
              onChange={(e) => setSafeSearch(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-0 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="strict">{language === 'vi' ? 'Nghiêm ngặt' : 'Strict'}</option>
              <option value="moderate">{language === 'vi' ? 'Vừa phải' : 'Moderate'}</option>
              <option value="off">{language === 'vi' ? 'Tắt' : 'Off'}</option>
            </select>
          </div>

          {/* Search History Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-purple-500" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {language === 'vi' ? 'Lịch sử tìm kiếm' : 'Search History'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'vi' ? 'Lưu lịch sử tìm kiếm của bạn' : 'Save your search history'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowConfirm(true)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                {language === 'vi' ? 'Xóa lịch sử' : 'Clear History'}
              </button>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={searchHistory}
                  onChange={(e) => setSearchHistory(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-yellow-500" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {language === 'vi' ? 'Thông báo' : 'Notifications'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'vi' ? 'Nhận thông báo từ tìm kiếm' : 'Receive search notifications'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {language === 'vi' ? 'Lưu cài đặt' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {language === 'vi' ? 'Xác nhận xóa' : 'Confirm Clear'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {language === 'vi' 
                ? 'Bạn có chắc muốn xóa toàn bộ lịch sử tìm kiếm?' 
                : 'Are you sure you want to clear all search history?'}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {language === 'vi' ? 'Hủy' : 'Cancel'}
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                {language === 'vi' ? 'Xóa' : 'Clear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;