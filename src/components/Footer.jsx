import React from "react";
import { quickLinks, settingMenu } from "../utils/Constants";

const Footer = () => {
    return (
        <footer className="bg-[#f2f2f2] dark:bg-gray-800 transition-colors duration-200">
            <div className="flex py-[15px] px-[15px] md:px-[30px] border-b border-[#dadce0] dark:border-gray-700">
                <span className="text-[#70757a] dark:text-gray-400 text-[15px] leading-none">
                    England
                </span>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between py-3 md:py-0 md:px-[15px] border-b border-[#dadce0] dark:border-gray-700">
                <div className="flex justify-center">
                    {quickLinks.map((menu, index) => (
                        <span
                            key={index}
                            className="text-[#70757a] dark:text-gray-400 text-[12px] md:text-[14px] leading-none p-[10px] md:p-[15px]"
                        >
                            {menu}
                        </span>
                    ))}
                </div>
                
                <div className="flex justify-center">
                    {settingMenu.map((menu, index) => (
                        <span
                            key={index}
                            className="text-[#70757a] dark:text-gray-400 text-[12px] md:text-[14px] leading-none p-[10px] md:p-[15px]"
                        >
                            {menu}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;