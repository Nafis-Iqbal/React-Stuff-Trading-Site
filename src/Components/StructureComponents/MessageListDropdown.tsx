import { motion } from "framer-motion";
import { forwardRef } from "react";

type MessageListDropdownProps = {
    className?: string;
};

const MessageListDropdownBase = forwardRef<HTMLDivElement, MessageListDropdownProps>(({className}, ref) => {
    return (
        <div className="absolute top-full right-0 flex flex-col w-[70%] md:w-[25%] p-2 bg-pink-300 rounded-md z-50"
            ref={ref}
        >
          <div className='flex justify-between space-x-4'>
            <div className='flex space-x-5 items-center'>
              <img src="public/user1.png" alt="User1" className='size-[60px]'></img>
              <p>User 1</p>
            </div>
            
            <button className='p-2 border-b-2 border-pink-300'>Feature not available</button>
          </div>
        </div>
    );
});

MessageListDropdownBase.displayName = "MessageListDropdown";

export const MessageListDropdown = motion(MessageListDropdownBase);