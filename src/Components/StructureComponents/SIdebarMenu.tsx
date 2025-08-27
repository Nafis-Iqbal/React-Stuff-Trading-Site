import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
import { UserApi } from '../../Services/API';
import { useLogout } from '../../Hooks/UtilHooks';
import { motion } from 'framer-motion';

type SidebarMenuProps = {
    isPopOutSidebar?: boolean,
    onClose?: () => void,
    className?: string,
}

const SidebarMenu = forwardRef<HTMLDivElement, SidebarMenuProps>(({isPopOutSidebar = false, onClose, className}, ref) => {
    const navigate = useNavigate();
    const logoutG = useLogout();

    const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ({});

    const onNavigate = (path: string) => {
        navigate(path);

        if(onClose) onClose();
    }

    const smallScreenStyle = `fixed top-0 left-0 md:hidden w-[60%] min-h-screen bg-pink-300 rounded-sm border-r-4 border-pink-600 z-50 ${className}`;
    const bigScreenStyle = `hidden md:block md:w-[20%] bg-pink-300 rounded-sm border-r-4 border-pink-600 ${className}`;

    return (
        <div className={isPopOutSidebar ? smallScreenStyle : bigScreenStyle} ref={ref}>
            {/* <div className="fixed inset-0 bg-gray-700/50 opacity-50 z-40 backdrop-blur-sm pointer-events-auto" onClick={() => {}}></div> */}
            
            {isPopOutSidebar && onClose && (
                <div>
                    <div className="flex justify-center items-center min-h-[120px] font-bold text-3xl bg-pink-400 border-b-4 border-pink-100 text-gray-100">Stuff Trader</div>
                    <button className="w-[100%] h-[40px] bg-emerald-500 text-lg text-white" onClick={() => onClose()}>Close</button>
                </div>
            )}

            <div className="bg-pink-400 p-3 text-xl text-center text-pink-100">Pages</div>

            <ul className="flex flex-col space-y-1">
                <li>
                    <button onClick={() => onNavigate("/dashboard")} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Dashboard</button>
                </li>
                <li>
                    <button onClick={() => onNavigate(`/listings/${ownUserData?.data.data.id ?? 0}`)} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Listings</button>
                </li>
                <li>
                    <button onClick={() => onNavigate(`/bids/${ownUserData?.data.data.id ?? 0}`)} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Bids</button>
                </li>
                <li>
                    <button onClick={() => onNavigate(`/trades/${ownUserData?.data.data.id ?? 0}`)} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Trades</button>
                </li>
            </ul>

            <div className="bg-pink-400 p-3 text-xl text-center text-pink-100">Quick Actions</div>
            
            <ul className="flex flex-col space-y-1">
                <li>
                    <button 
                        className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 
                        disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => onNavigate(`/listings/${ownUserData?.data.data.id ?? 0}?createListing=true`)}
                    >
                        Create New Listing
                    </button>
                </li>
                <li>
                    <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Popular Listings</button>
                </li>
                <li>
                    <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Nearby Listings</button>
                </li>
                <li>
                    <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Pending Trades</button>
                </li>
            </ul>

            <div className="bg-pink-400 p-3 text-xl text-center text-pink-100">Personalize</div>
            
            <ul className="flex flex-col space-y-1">
                <li>
                    <button onClick={() => onNavigate(`/profile/${ownUserData?.data.data.id ?? 0}`)} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Profile</button>
                </li>
                <li>
                    <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-pink-100" disabled>Settings</button>
                </li>
            </ul>

            <button className="display:block w-full bg-emerald-500 hover:bg-emerald-400 p-3 text-xl text-center text-pink-100" onClick={() => logoutG()}>Logout</button>
        </div>
    );
});

SidebarMenu.displayName = "SidebarMenu";

export const MotionSidebarMenu = motion(SidebarMenu);

export default SidebarMenu;