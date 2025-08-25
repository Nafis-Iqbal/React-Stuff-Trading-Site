import {useState} from 'react';
import { Link } from 'react-router-dom';
import { UserApi } from '../../Services/API';

import { MotionSidebarMenu } from './SIdebarMenu';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle, Bell } from 'lucide-react';
import OpenSidebarButton from './OpenSidebarButton';
import { ProfileInfoDropdown } from './ProfileMenuDropdown';
import { NotificationListDropdown } from './NotificationListDropdown';
import { MessageListDropdown } from './MessageListDropdown';
import { set } from 'lodash';

const Navbar = ({className} : {className?: string}) => {
  const [isMessageListOpen, setIsMessageListOpen] = useState(false);
  const [isNotificationListOpen, setIsNotificationListOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);

  const {data: ownUserDetail} = UserApi.useGetAuthenticatedUserRQ();

  const onNotificationIconPress = () => {
    setIsNotificationListOpen(!isNotificationListOpen);
    setIsMessageListOpen(false);
    setIsProfileMenuOpen(false);
  }

  const onMessageIconPress = () => {
    setIsMessageListOpen(!isMessageListOpen);
    setIsNotificationListOpen(false);
    setIsProfileMenuOpen(false);
  }

  const onProfileIconPress = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsMessageListOpen(false);
    setIsNotificationListOpen(false);
  }

  const ownUser = ownUserDetail?.data.data;
  
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 bg-pink-600 text-white p-4 ${className}`}>
      <div className="relative">
        <div className="flex justify-between items-center">
          <OpenSidebarButton className="border-2 border-pink-100 md:hidden p-3" onClick={() => setIsSidebarMenuOpen(true)}/>

          {/* Logo */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold ml-3 md:ml-5">
            <Link to="/dashboard" className="text-white hover:text-shadow-neonYellow">
              Stuff Trader
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {isSidebarMenuOpen && (
              <MotionSidebarMenu
                isPopOutSidebar={true}
                onClose={() => setIsSidebarMenuOpen(false)}
                variants={{
                  initial: { opacity: 0, x: "-100%" },
                  animate: { opacity: 1, x: "-2%", transition: { type: "spring", stiffness: 300, damping: 30 } },
                  exit: { opacity: 0, x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
                }}
                initial="initial"
                animate="animate"
                exit="exit"
              />
            )}
          </AnimatePresence>

          {/* Message & Notifications Menu */}
          <div className="relative flex items-center space-x-4 md:space-x-8 md:mr-5 text-lg md:text-2xl">
            <div className="relative">
              <MessageCircle className="size-6 md:size-8 text-pink-200 fill-pink-400 cursor-pointer hover:text-white text-border-2" onClick={() => onMessageIconPress()}/>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                0
              </span>
            </div>

            {/* Notification Bell Icon with Badge */}
            <div className="relative">
              <Bell className="size-6 md:size-8 text-pink-200 fill-pink-400 cursor-pointer hover:text-white text-border-2" onClick={() => onNotificationIconPress()}/>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                0
              </span>
            </div>

            {/* User Avatar */}
            <div className="flex space-x-4 items-center">
              <img 
                src={ownUserDetail?.data?.data.profile_picture} 
                alt="User Avatar" 
                className="w-8 h-8 cursor-pointer rounded-full" 
                onClick={() => onProfileIconPress()}
              />

              <div className="hidden md:flex md:flex-col md:justify-center">
                <span className="text-sm text-pink-200 hover:underline hover:text-white cursor-pointer">{ownUserDetail?.data?.data.user_name}</span>
                <span className="text-xs text-pink-200 hover:underline hover:text-white cursor-pointer">{ownUserDetail?.data?.data.email}</span>
                <span className="text-xs text-pink-200 hover:underline hover:text-white cursor-pointer">{ownUserDetail?.data?.data.role}</span>
              </div>
            </div>
          </div>
        </div>

        
        <AnimatePresence mode="wait">
          {isProfileMenuOpen && (
            <ProfileInfoDropdown
              userInfo={ownUser}
              variants={{
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
                  exit: { opacity: 0, y: -20, transition: { type: "spring", stiffness: 300, damping: 30 } },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          {isMessageListOpen && (
            <MessageListDropdown
              variants={{
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
                  exit: { opacity: 0, y: -20, transition: { type: "spring", stiffness: 300, damping: 30 } },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isNotificationListOpen && (
            <NotificationListDropdown
              variants={{
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
                  exit: { opacity: 0, y: -20, transition: { type: "spring", stiffness: 300, damping: 30 } },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
