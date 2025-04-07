import React, { useState, useEffect } from 'react';

import { queryClient } from '../Services/API/ApiInstance';
import { useNavigate } from 'react-router-dom';

import UserInfo from '../Components/UserInfo';
import BasicTextDiv from '../Components/CustomDivElements';
import ScrollToTopButton from '../Components/StructureComponents/ScrollToTopButton';
import TagManagerModule from '../Components/ModularComponents/TagManagerModule';

const ProfilePage: React.FC = () => {
  let userDetailsData: User = {user_name: "Nafis", phone_number: "01900000000", totalListings: 20, totalTrades: 10};

  const navigate = useNavigate();  

  return (
    <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 text-white min-h-screen">
        <div className="md:hidden min-h-[30px] bg-pink-200"></div>

        <main className="flex flex-col md:w-[60%] h-full bg-pink-200">
            <UserInfo customStyle="p-3 m-2 bg-pink-100" profilePicture='images/profile_picture.jpg'/>
            
            {/* User Activities Info */}
            <div className='flex flex-col p-2 mx-2 space-y-2 md:space-y-3 bg-pink-100 rounded-md'>
              <h1 className='text-xl md:text-2xl p-2 bg-pink-200 text-pink-800 font-semibold'>User Activities</h1>

              <div className='flex justify-between items-center mt-2'>
                <div className='flex items-center space-x-2 md:space-x-4 ml-1'>
                  <p className='text-gray-700 text-lg md:text-xl'>Total listings posted</p>
                  <p className='text-red-600 text-xl md:text-2xl font-bold'>{userDetailsData.totalListings}</p>
                </div>
                
                <button className='p-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-sm' onClick={() => {navigate("/listings")}}>Show all listings</button>
              </div>

              <div className='flex justify-between items-center mt-2'>
                <div className='flex items-center space-x-2 md:space-x-4 ml-1'>
                  <p className='text-gray-700 text-lg md:text-xl'>Total trades done</p>
                  <p className='text-green-600 text-xl md:text-2xl font-bold'>{userDetailsData.totalTrades}</p>
                </div>
                
                <button className='p-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-sm' onClick={() => {navigate("/trades")}}>Show all trades</button>
              </div>
            </div>

            {/* Tag Creation Panel */}
            <TagManagerModule customStyle='p-2 mx-2 mt-10 bg-pink-100'/>

            {/* User Role Management Panel */}
            <div className='p-2 mt-5 mx-2 bg-pink-100 rounded-sm'>
              
            </div>
        </main>
    </div>
  );
};

export default ProfilePage;
