import ProfileIcon from "./ProfileIcon";

const HomeHeader = () => {
    return (
        <header className="h-16 flex justify-between md:justify-end items-center gap-4 px-5 bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="flex gap-4">
                <span className="text-black/[0.87] dark:text-white/[0.87] text-[13px] line-height hover:underline cursor-pointer">
                    Gmail
                </span>
                <span className="text-black/[0.87] dark:text-white/[0.87] text-[13px] line-height hover:underline cursor-pointer">
                    Images
                </span>
            </div>
            
            <ProfileIcon />
        </header>
    );
};

export default HomeHeader;