import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { UserApi } from '../../Services/API';
import { useLogout } from '../../Hooks/UtilHooks';

const SidebarMenu: React.FC<{isPopOutSidebar: boolean, onClose: () => void}> = ({isPopOutSidebar, onClose} : {isPopOutSidebar: boolean, onClose: () => void}) => {
    const navigate = useNavigate();
    const logoutG = useLogout();

    const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ();


    const smallScreenStyle = "fixed top-0 left-0 md:hidden w-[60%] min-h-screen bg-pink-300 rounded-sm border-r-4 border-pink-600 z-50";
    const bigScreenStyle = "hidden md:block md:w-[20%] bg-pink-300 rounded-sm border-r-4 border-pink-600";
  
  return (
    <aside className={isPopOutSidebar ? smallScreenStyle : bigScreenStyle}>
        {isPopOutSidebar && (
            <div>
                <div className="flex justify-center items-center min-h-[120px] font-bold text-3xl bg-pink-400 border-b-4 border-pink-100 text-gray-100">Stuff Trader</div>
                <button className="w-[100%] h-[40px] bg-emerald-500 text-lg text-white" onClick={() => onClose()}>Close</button>
            </div>
        )}

        <div className="bg-pink-400 p-3 text-xl text-center text-pink-100">Pages</div>

        <ul className="flex flex-col space-y-1">
            <li>
                <button onClick={() => {navigate("/dashboard"); onClose();}} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Dashboard</button>
            </li>
            <li>
                <button onClick={() => {navigate(`/listings/${ownUserData?.data.data.id ?? 0}`); onClose();}} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Listings</button>
            </li>
            <li>
                <button onClick={() => {navigate(`/bids/${ownUserData?.data.data.id ?? 0}`); onClose();}} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Bids</button>
            </li>
            <li>
                <button onClick={() => {navigate(`/trades/${ownUserData?.data.data.id ?? 0}`); onClose();}} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Trades</button>
            </li>
        </ul>

        <div className="bg-pink-400 p-3 text-xl text-center text-pink-100">Quick Actions</div>
        
        <ul className="flex flex-col space-y-1">
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Popular Listings</button>
            </li>
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Nearby Listings</button>
            </li>
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Create New Listing</button>
            </li>
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled>Show Pending Trades</button>
            </li>
        </ul>

        <div className="bg-pink-400 p-3 text-xl text-center text-pink-100">Personalize</div>
        
        <ul className="flex flex-col space-y-1">
            <li>
                <button onClick={() => {navigate(`/profile/${ownUserData?.data.data.id ?? 0}`); onClose();}} className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 text-pink-100">Profile</button>
            </li>
            <li>
                <button className="w-[100%] p-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-pink-100" disabled>Settings</button>
            </li>
        </ul>

        <button className="display:block w-full bg-pink-400 hover:bg-emerald-400 p-3 text-xl text-center text-pink-100" onClick={() => logoutG()}>Logout</button>
    </aside>
  );
};

export default SidebarMenu;