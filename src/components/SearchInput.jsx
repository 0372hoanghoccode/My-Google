import { useState, useEffect, useRef, useContext } from "react";
import { Search, X, Mic, Camera, History, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../utils/ContextApi";
import toast from 'react-hot-toast';

const SMART_SUGGESTIONS = {
  'react': {
    'en': ['react tutorial', 'react hooks', 'react native', 'react router', 'react redux'],
    'vi': ['học react', 'react cơ bản', 'react nâng cao', 'react native']
  },
  'javascript': {
    'en': ['javascript basics', 'javascript es6', 'javascript async await', 'javascript promises'],
    'vi': ['javascript căn bản', 'javascript nâng cao', 'javascript async', 'javascript promise']
  },
  'python': {
    'en': ['python tutorial', 'python django', 'python flask', 'python machine learning'],
    'vi': ['học python', 'python cơ bản', 'django python', 'machine learning python']
  },
  'web': {
    'en': ['web development', 'web design', 'web hosting', 'web security'],
    'vi': ['phát triển web', 'thiết kế web', 'hosting web', 'bảo mật web']
  }
};

const SearchInput = ({ onFocus, onBlur }) => {
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { 
    searchHistory, 
    addToHistory, 
    clearHistory, 
    language 
  } = useContext(Context);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const getStoredHistory = () => {
      return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    };

    if (searchQuery) {
      // Lấy history từ localStorage
      const storedHistory = getStoredHistory();
      
      const smartSuggestions = Object.entries(SMART_SUGGESTIONS)
        .filter(([key]) => searchQuery.toLowerCase().includes(key))
        .flatMap(([, values]) => values[language] || values['en']);

      const historyMatches = storedHistory
        .filter(item => item.query.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(item => item.query);

      const allSuggestions = [...new Set([...historyMatches, ...smartSuggestions])];
      setSuggestions(allSuggestions.slice(0, 8));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, language]);

  const handleSearch = (query) => {
    if (!query?.trim()) {
      toast.error(language === 'vi' 
        ? 'Vui lòng nhập từ khóa tìm kiếm' 
        : 'Please enter a search term');
      return;
    }

    try {
      addToHistory(query.trim());
      navigate(`/${query.trim()}/1`);
      setShowDropdown(false);
      toast.success(language === 'vi' 
        ? 'Tìm kiếm thành công!' 
        : 'Search successful!');
    } catch (error) {
      toast.error(language === 'vi' 
        ? 'Tìm kiếm thất bại. Vui lòng thử lại.' 
        : 'Failed to perform search. Please try again.');
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    toast.success(language === 'vi' 
      ? 'Đã xóa lịch sử tìm kiếm!' 
      : 'Search history cleared!');
  };

  return (
    <div className="relative w-full max-w-2xl" ref={dropdownRef}>
      <div className="flex items-center w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:shadow-md focus-within:shadow-md transition-shadow duration-200">
        <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
          onFocus={() => {
            setShowDropdown(true);
            onFocus?.();
          }}
          className="flex-1 ml-3 outline-none bg-transparent dark:text-white"
          placeholder={language === 'vi' 
            ? "Tìm kiếm Google hoặc nhập URL" 
            : "Search Google or type a URL"}
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </button>
        )}

        <div className="flex items-center gap-2 ml-2 border-l pl-4 dark:border-gray-700">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Mic onClick={() => navigate('/voice-search')} className="w-5 h-5 text-blue-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Camera onClick={() => navigate('/image-search')} className="w-5 h-5 text-green-500" />
          </button>
        </div>
      </div>

      {showDropdown && (suggestions.length > 0) && (
        <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-2">
            <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{language === 'vi' ? 'Gợi ý' : 'Suggestions'}</span>
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion)}
                className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Search className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;