import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Search, Image, Newspaper, Play, Tag, Settings } from "lucide-react";
import Logo from "../assets/google-logo.png";
import SearchInput from "./SearchInput";
import ProfileIcon from "./ProfileIcon";
import { Context } from "../utils/ContextApi";

const SearchResultHeader = () => {
   const [selectedMenu, setSelectedMenu] = useState("All");
   const { setImageSearch, language, theme } = useContext(Context);
   const navigate = useNavigate();

   const getMenuText = (name) => {
     const menuTexts = {
       'en': {
         'All': 'All',
         'Images': 'Images',
         'News': 'News',
         'Videos': 'Videos',
         'Shopping': 'Shopping',
         'Settings': 'Settings'
       },
       'vi': {
         'All': 'Tất cả',
         'Images': 'Hình ảnh',
         'News': 'Tin tức',
         'Videos': 'Video',
         'Shopping': 'Mua sắm',
         'Settings': 'Cài đặt'
       }
     };
     
     return menuTexts[language][name] || menuTexts['en'][name];
   };

   const menu = [
     { name: "All", icon: <Search className="w-4 h-4" /> },
     { name: "Images", icon: <Image className="w-4 h-4" /> },
     { name: "News", icon: <Newspaper className="w-4 h-4" /> },
     { name: "Videos", icon: <Play className="w-4 h-4" /> },
     { name: "Shopping", icon: <Tag className="w-4 h-4" /> },
     { name: "Settings", icon: <Settings className="w-4 h-4" /> },
   ];

   useEffect(() => {
     return () => setImageSearch(false);
   }, [setImageSearch]);

   const clickHandler = (menuItem) => {
     const isTypeImage = menuItem.name === "Images";
     setImageSearch(isTypeImage);
     setSelectedMenu(menuItem.name);

     if (menuItem.name === "Settings") {
       navigate("/settings");
     }
   };

   return (
     <div className={`sticky top-0 border-b z-50 
       ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
       transition-colors duration-200`}>
       <div className="flex flex-col md:flex-row items-center justify-between py-2 md:px-8 max-w-7xl mx-auto">
         <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
           <Link to="/" className="mr-8">
             <img 
               src={Logo} 
               alt="Google" 
               className={`h-8 md:h-10 
                 ${theme === 'dark' ? 'filter brightness-0 invert' : ''}`} 
             />
           </Link>
           <div className="flex-1 max-w-2xl">
             <SearchInput />
           </div>
         </div>

         <div className="hidden md:block">
           <ProfileIcon />
         </div>
       </div>

       <div className="flex justify-start overflow-x-auto scrollbar-hide px-4 md:px-8 max-w-7xl mx-auto">
     {menu.map((item, index) => (
       <button
         key={index}
         onClick={() => clickHandler(item)}
         className={`
           flex items-center px-4 py-3 border-b-2 
           flex-shrink-0 transition-colors duration-200 
           ${selectedMenu === item.name
             ? `${theme === 'dark' 
                 ? 'border-blue-500 text-blue-400' 
                 : 'border-blue-500 text-blue-500'}`
             : `${theme === 'dark'
                 ? 'border-transparent text-gray-400 hover:text-gray-200'
                 : 'border-transparent text-gray-600 hover:text-gray-900'}`
           }
         `}
         aria-label={`Switch to ${item.name} search`}
       >
         <span className="mr-2">{item.icon}</span>
         <span className="text-sm font-medium">{getMenuText(item.name)}</span>
       </button>
     ))}
   </div>
 </div>
   );
};

export default SearchResultHeader;