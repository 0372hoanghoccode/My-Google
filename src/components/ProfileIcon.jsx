import { Grip } from "lucide-react"; 

import Profile from "../assets/Hoang-google.png";

const ProfileIcon = () => {
    return (
        <div className="flex gap-2">
            <span className="h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-black/[0.05]">
                <Grip size={20} color="#5f6368" /> 
            </span>
            <span className="h-10 w-10 relative flex justify-center items-center border-none">
                <span className="h-8 w-8 rounded-full overflow-hidden border-none">
                    <img className="h-full w-full object-cover" src={Profile} />
                </span>
            </span>
        </div>
    );
};

export default ProfileIcon;
