import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../Hooks/UtilHooks';
import { motion } from "framer-motion";
import { MessageCircle, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMessaggeListOpen, setIsMessageListOpen] = useState(false);
  const [isNotificationListOpen, setIsNotificationListOpen] = useState(false);

  const onNotificationIconPress = () => {
    setIsNotificationListOpen(!isNotificationListOpen);
    setIsMessageListOpen(false);
  }

  const onMessageIconPress = () => {
    setIsMessageListOpen(!isMessaggeListOpen);
    setIsNotificationListOpen(false);
  }
  
  return (
    <nav className="relative bg-pink-600 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold ml-3 md:ml-5">
          <Link to="/dashboard" className="hover:text-gray-300">
            Stuff Trader
          </Link>
        </div>

        {/* Message & Notifications Menu */}
        <div className="relative flex space-x-6 md:space-x-8 mr-2 md:mr-5 text-xl md:text-2xl">
          <div className="relative">
            <MessageCircle className="size-6 md:size-8 text-pink-200 fill-pink-200 cursor-pointer hover:text-pink-400" onClick={() => onMessageIconPress()}/>
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              4
            </span>
          </div>

          {/* Notification Bell Icon with Badge */}
          <div className="relative">
            <Bell className="size-6 md:size-8 text-pink-200 fill-pink-200 cursor-pointer hover:text-pink-400" onClick={() => onNotificationIconPress()}/>
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </div>
        </div>
      </div>

      {isMessaggeListOpen && (
        <div className="absolute top-full right-0 flex flex-col w-[70%] md:w-[25%] p-2 bg-pink-300 rounded-md z-50">
          <div className='flex justify-between space-x-4'>
            <div className='flex space-x-5 items-center'>
              <img src="public/user1.png" alt="User1" className='size-[60px]'></img>
              <p>User 1</p>
            </div>
            
            <button className='p-2 border-b-2 border-pink-300'>Feature not available</button>
          </div>
          
          <div className='flex justify-between space-x-4'>
            <div className='flex space-x-5 items-center'>
              <img src="public/user1.png" alt="User1" className='size-[60px]'></img>
              <p>User 1</p>
            </div>
            
            <button className='p-2 border-b-2 border-pink-300'>Feature not available</button>
          </div>

          <div className='flex justify-between space-x-4'>
            <div className='flex space-x-5 items-center'>
              <img src="public/user1.png" alt="User1" className='size-[60px]'></img>
              <p>User 1</p>
            </div>
            
            <button className='p-2 border-b-2 border-pink-300'>Feature not available</button>
          </div>

          <div className='flex justify-between space-x-4'>
            <div className='flex space-x-5 items-center'>
              <img src="public/user1.png" alt="User1" className='size-[60px]'></img>
              <p>User 1</p>
            </div>
            
            <button className='p-2 border-b-2 border-pink-300'>Feature not available</button>
          </div>
        </div>
      )}

      {isNotificationListOpen && (
        <div className="absolute top-full right-0 flex flex-col w-[70%] md:w-[25%] p-2 bg-pink-300 rounded-md z-50">
          <div className='flex justify-between items-center space-x-4'>
            <button className='p-2 border-b-2 border-pink-300'>This is a notification. Feature not available</button>
          </div>
          
          <div className='flex justify-between items-center space-x-4'>
            <button className='p-2 border-b-2 border-pink-300'>This is a notification. Feature not available</button>
          </div>

          <div className='flex justify-between items-center space-x-4'>
            <button className='p-2 border-b-2 border-pink-300'>This is a notification. Feature not available</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
