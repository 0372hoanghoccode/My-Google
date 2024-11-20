import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Search, Image, Newspaper, Play, Tag, Settings } from "lucide-react";
import Logo from "../assets/google-logo.png";
import SearchInput from "./SearchInput";
import ProfileIcon from "./ProfileIcon";
import { Context } from "../utils/ContextApi";

const SearchResultHeader = () => {
  const [selectedMenu, setSelectedMenu] = useState("All");
  const { setImageSearch } = useContext(Context);

  const menu = [
    { name: "All", icon: <Search className="w-4 h-4" /> },
    { name: "Images", icon: <Image className="w-4 h-4" /> },
    { name: "News", icon: <Newspaper className="w-4 h-4" /> },
    { name: "Videos", icon: <Play className="w-4 h-4" /> },
    { name: "Shopping", icon: <Tag className="w-4 h-4" /> },
    { name: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  useEffect(() => {
    // Cleanup: Reset the image search state when component unmounts
    return () => setImageSearch(false);
  }, [setImageSearch]);

  const clickHandler = (menuItem) => {
    const isTypeImage = menuItem.name === "Images";
    setImageSearch(isTypeImage);
    setSelectedMenu(menuItem.name);
  };

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
          <Link to="/" className="mr-8">
            <img src={Logo} alt="Google" className="h-8 md:h-10" />
          </Link>
          <div className="flex-1 max-w-2xl">
            <SearchInput />
          </div>
        </div>

        <div className="hidden md:block">
          <ProfileIcon />
        </div>
      </div>

      <div className="flex justify-start px-4 md:px-8 max-w-7xl mx-auto">
        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => clickHandler(item)}
            className={`flex items-center px-4 py-3 border-b-2 transition-colors duration-200 ${
              selectedMenu === item.name
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResultHeader;
