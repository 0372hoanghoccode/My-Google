import React, { useContext } from "react";
import { quickLinks, settingMenu } from "../utils/Constants";
import { Context } from "../utils/ContextApi";

const Footer = () => {
    const { language, theme } = useContext(Context);

    return (
        <footer className={`
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-[#f2f2f2]'} 
            transition-colors duration-200
        `}>
            <div className={`
                flex py-[15px] px-[15px] md:px-[30px] border-b 
                ${theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-[#dadce0] text-[#70757a]'}
            `}>
                <span className="text-[15px] leading-none">
                    {language === 'vi' ? 'Anh' : 'England'}
                </span>
            </div>
            
            <div className={`
                flex flex-col md:flex-row justify-between py-3 md:py-0 md:px-[15px] border-b
                ${theme === 'dark' ? 'border-gray-700' : 'border-[#dadce0]'}
            `}>
                <div className="flex justify-center">
                    {quickLinks[language].map((menu, index) => (
                        <span
                            key={index}
                            className={`
                                text-[12px] md:text-[14px] leading-none p-[10px] md:p-[15px]
                                ${theme === 'dark' ? 'text-gray-400' : 'text-[#70757a]'}
                            `}
                        >
                            {menu}
                        </span>
                    ))}
                </div>
                
                <div className="flex justify-center">
                    {settingMenu[language].map((menu, index) => (
                        <span
                            key={index}
                            className={`
                                text-[12px] md:text-[14px] leading-none p-[10px] md:p-[15px]
                                ${theme === 'dark' ? 'text-gray-400' : 'text-[#70757a]'}
                            `}
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