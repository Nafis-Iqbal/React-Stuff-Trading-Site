import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import UserInfoModule from '../Components/ModularComponents/UserInfo';
import { UserApi, TradeApi } from '../Services/API';
import TagManagerModule from '../Components/ModularComponents/TagManagerModule';
import { role } from '../Types&Enums/Enums';
import { UserManagerModule } from '../Components/ModularComponents/UserManagerModule';
import TradeInfoBlock from '../Components/ElementComponents/TradeInfoBlock';
import { ListingManagerModule } from '../Components/ModularComponents/ListingManagerModule';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();  

  const { userId } = useParams();
  const parsedUserId = Number(userId);

  const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ({});

  const {data: userDetailsData} = UserApi.useGetUserDetailRQ(
    parsedUserId,
    (parsedUserId > 0)
  );

  const ownUser = ownUserData?.data.data;
  const {data: tradesBetweenUsers} = TradeApi.useGetTradesBetweenUsersRQ(parsedUserId, (!ownUser ? false : (parsedUserId === ownUser.id) ? false : true));

  //useMemo Later
  const completedTradesBetweenUsers = tradesBetweenUsers?.data.data.filter((trade: Trade) => trade.status !== "pending");

  const userDetail = userDetailsData?.data.data;

  if (!userDetail && parsedUserId > 0) {
    return (
      <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 text-white min-h-screen">
        <div className="md:hidden min-h-[30px] bg-pink-200"></div>
        <main className="flex flex-col md:w-[60%] h-full bg-pink-200">
          <div className="p-4 text-center text-gray-700">Loading user details...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 overflow-x-hidden text-white min-h-screen">
        <div className="md:hidden min-h-[30px] bg-pink-200"></div>

        <main className="flex flex-col md:w-[60%] h-full space-y-2 md:space-y-5 bg-pink-200">
            <UserInfoModule 
              userId={parsedUserId} 
              customStyle="p-3 mx-2 mt-2 bg-pink-100" 
              profilePicture={userDetail.profile_picture ?? '/images/profile_picture.jpg'}
            />
            
            {/* User Activities Info */}
            <div className='flex flex-col p-2 mx-2 bg-pink-100 rounded-md'>
              <h1 className='p-2 text-center text-xl md:text-2xl bg-pink-100 text-pink-800 font-semibold'>User Activities</h1>

              <div className='flex flex-col'>
                <div className='flex justify-between items-center py-2 bg-pink-200'>
                  <div className='flex items-center space-x-2 md:space-x-4 ml-1'>
                    <p className='text-gray-700 text-lg md:text-xl'>Total listings posted</p>
                    <p className='text-red-600 text-xl md:text-2xl font-bold'>{userDetail.totalListings ?? 0}</p>
                  </div>
                  
                  <button className='p-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-sm' onClick={() => {navigate(`/listings/${userId}`)}}>Show all listings</button>
                </div>

                <div className='flex justify-between items-center py-2 mb-2 md:mb-3 bg-pink-200'>
                  <div className='flex items-center space-x-2 md:space-x-4 ml-1'>
                    <p className='text-gray-700 text-lg md:text-xl'>Total trades done</p>
                    <p className='text-green-600 text-xl md:text-2xl font-bold'>{userDetail.totalTrades ?? 0}</p>
                  </div>
                  
                  <button className='p-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-sm' onClick={() => {navigate(`/trades/${userId}`)}}>Show all trades</button>
                </div>
              </div>
            </div>

            {/* Interaction History */}
            {ownUser.id !== parsedUserId &&
              <div className='flex flex-col p-2 mx-2 bg-pink-100 rounded-md'>
                <h1 className='p-2 text-center text-xl md:text-2xl bg-pink-100 text-pink-800 font-semibold'>Trade History with User</h1>

                <div className='flex flex-col space-y-2 mb-2'>
                  {(completedTradesBetweenUsers && completedTradesBetweenUsers.length > 0) ? (
                      completedTradesBetweenUsers.map((trade: Trade) => {
                          return (
                              <div>
                                  <TradeInfoBlock
                                      hideRateButton={true} 
                                      trade_id={trade.id}
                                      own_user_id={ownUserData?.data.data.id}
                                      listingName={trade?.listing_title ?? "Fix Listing Name"}
                                      listing_id={trade.listing_id}
                                      buyer_id={trade.buyer_id} 
                                      buyer_name={trade?.buyer_name ?? "Fix Buyer Name"}
                                      seller_id={trade.seller_id}
                                      seller_name={trade?.seller_name ?? "Fix Seller Name"}
                                      trade_status={trade.status}
                                      tradePrice={trade.amount} 
                                      updatedAt={trade.updatedAt.toString()}
                                  />
                              </div>
                          )
                      })
                  ) : (
                      <p className='text-pink-600 text-center'>You have no trade history with this user.</p>
                  )}
                </div>
              </div>
            }

            {/* Admin Panel */}
            {ownUser.role === role.admin && ownUser.id === parsedUserId && 
              <div className='flex flex-col space-y-2 md:space-y-5'>
                <TagManagerModule customStyle='p-2 mx-2 bg-pink-100'/>

                {/* User Role Management Panel */}
                <UserManagerModule ownUserId={ownUser.id} />

                {/* Listing Status Management Panel */}
                <ListingManagerModule ownUserId={ownUser.id} />
              </div>
            }  
        </main>
    </div>
  );
};

export default ProfilePage;
