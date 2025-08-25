import { motion } from "framer-motion";
import { forwardRef } from "react";

type NotificationMenuDropdownProps = {
    className?: string;
};

const NotificationListDropdownBase = forwardRef<HTMLDivElement, NotificationMenuDropdownProps>(({className}, ref) => {
    return (
        <div className={`absolute top-full right-0 flex flex-col w-[70%] md:w-[25%] p-2 bg-pink-300 rounded-md z-50 ${className ?? ""}`} ref={ref}>
          <div className='flex justify-between items-center space-x-4'>
            <button className='p-2 border-b-2 border-pink-300'>This is a notification. Feature not available</button>
          </div>
        </div>
    );
});

NotificationListDropdownBase.displayName = "NotificationListDropdown";

export const NotificationListDropdown = motion(NotificationListDropdownBase);