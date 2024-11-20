import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Globe, Shield, Eye, Bell, Search } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [safeSearch, setSafeSearch] = useState('moderate');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [searchHistory, setSearchHistory] = useState(true);

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('searchSettings', JSON.stringify({
      theme,
      safeSearch,
      language,
      notifications,
      searchHistory
    }));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Search Settings</h1>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Search className="w-4 h-4" />
            <span>Back to Search</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Theme Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-gray-500">Choose your preferred theme</p>
              </div>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Language Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5" />
              <div>
                <h3 className="font-medium">Language</h3>
                <p className="text-sm text-gray-500">Select search language</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          {/* SafeSearch Setting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5" />
              <div>
                <h3 className="font-medium">SafeSearch</h3>
                <p className="text-sm text-gray-500">Filter explicit results</p>
              </div>
            </div>
            <select
              value={safeSearch}
              onChange={(e) => setSafeSearch(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="strict">Strict</option>
              <option value="moderate">Moderate</option>
              <option value="off">Off</option>
            </select>
          </div>

          {/* Search History Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5" />
              <div>
                <h3 className="font-medium">Search History</h3>
                <p className="text-sm text-gray-500">Save your search history</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={searchHistory}
                onChange={(e) => setSearchHistory(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-gray-500">Receive search alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;