import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Camera, Sparkles } from 'lucide-react';
import Logo from "../assets/google-logo.png";
import HomeHeader from "../components/HomeHeader";
import SearchInput from "../components/SearchInput";
import Footer from "../components/Footer";
import { Context } from '../utils/ContextApi';

const Home = () => {
  const [searchAnimation, setSearchAnimation] = useState(false);
  const navigate = useNavigate();
  const { theme, language } = useContext(Context);

  const handleFeelingLucky = () => {
    const randomTopics = [
      'cute cats', 'funny memes', 'beautiful places', 
      'amazing facts', 'cool science', 'interesting history'
    ];
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    navigate(`/${randomTopic}/1`);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <HomeHeader />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          <div className="relative group">
            <img
              src={Logo}
              alt="Google"
              className="w-[172px] md:w-[272px] mb-8 transition-transform duration-300 group-hover:scale-105"
            />
            <Sparkles className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-500" />
          </div>

          <div className={`w-full transition-all duration-300 ${searchAnimation ? 'scale-105' : 'scale-100'}`}>
            <SearchInput onFocus={() => setSearchAnimation(true)} onBlur={() => setSearchAnimation(false)} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
              className="px-6 py-2 bg-[#f8f9fa] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center gap-2 group text-gray-700 dark:text-gray-300"
              onClick={() => navigate('/react/1')}
            >
              <Search className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-500" />
              <span>{language === 'vi' ? 'Tìm với Google' : 'Google Search'}</span>
            </button>
            
            <button 
              className="px-6 py-2 bg-[#f8f9fa] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center gap-2 group text-gray-700 dark:text-gray-300"
              onClick={handleFeelingLucky}
            >
              <Sparkles className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-yellow-500" />
              <span>{language === 'vi' ? 'Xem trang ngẫu nhiên' : "I'm Feeling Lucky"}</span>
            </button>
          </div>

          <div className="flex gap-4 mt-8">
            <button onClick={() => navigate('/voice-search')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <Mic className="w-6 h-6 text-blue-500" />
            </button>
            <button onClick={() => navigate('/image-search')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <Camera className="w-6 h-6 text-green-500" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
