import { useState } from "react";
import { UserApi } from "../../Services/API";
import { useNavigate } from "react-router-dom";
import { role } from "../../Types&Enums/Enums";
import { queryClient } from "../../Services/API/ApiInstance";
import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";

import { EditButton } from "./CustomInputElements";
import { StarRating } from "./StarRating";
import ConfirmationModal from "../Modals/ConfirmationModal";

export const UserViewBlock = ({ownUserId, userDetail}: {ownUserId: number, userDetail: User}) => {
    const navigate = useNavigate();

    const [isUpdateRoleConfirmationVisible, setIsUpdateRoleConfirmationVisible] = useState<boolean>(false);
    const {openNotificationPopUpMessage} = useGlobalUI();

    const {mutate: updateUserRole} = UserApi.useUpdateUserRoleRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                queryClient.invalidateQueries(["users"]);

                openNotificationPopUpMessage("User role updated successfully");
            }
            else{
                openNotificationPopUpMessage("Error updating user role");
            }
        },
        () => {
            openNotificationPopUpMessage("Error updating user role");
        }
    );

    const onUpdateUserRoleConfirmed = () => {
        if(userDetail.id) updateUserRole({ user_id: userDetail.id, role: role.admin });
        setIsUpdateRoleConfirmationVisible(false);
    }
    
    return (
        <div className='flex flex-col w-full p-2 bg-pink-200 rounded-md mb-3'>

            <ConfirmationModal
                isVisible={isUpdateRoleConfirmationVisible}
                message="This action will update this user's role to ADMIN, and grant him more access to the site. Are you sure you want to proceed?"
                customMessage={
                    <>
                        This action will update this user's role to&nbsp;&nbsp; 
                        <span className="text-emerald-500 font-bold">ADMIN&nbsp;</span>, 
                        and grant him more access to the site. Are you sure you want to proceed?
                    </>
                }
                onConfirm={() => onUpdateUserRoleConfirmed()}
                onCancel={() => setIsUpdateRoleConfirmationVisible(false)}
            />

            {/* User Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className='text-xl md:text-2xl font-semibold text-pink-800'>{userDetail.user_name}</h2>

                <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-sm text-sm font-bold ${
                        userDetail.role === role.admin ? 'bg-red-500 text-white' : 
                        userDetail.role === role.manager ? 'bg-orange-500 text-white' : 
                        'bg-green-500 text-white'
                    }`}>
                        {userDetail.role?.toUpperCase()}
                    </span>

                    {userDetail.role !== role.admin && userDetail.id !== ownUserId && <EditButton onClick={() => setIsUpdateRoleConfirmationVisible(true)}/>}
                </div>
            </div>

            {/* User Content */}
            <div className="flex flex-col md:flex-row w-full">
                {/* Profile Picture */}
                <div className="flex flex-col justify-center h-[120px] w-[120px] md:h-[150px] md:w-[150px] mx-auto md:mx-0 mb-3 md:mr-4 md:mb-0 bg-pink-200">
                    <img
                        src={userDetail.profile_picture || '/images/profile_picture.jpg'}
                        alt={`${userDetail.user_name} profile`}
                        className="w-full h-full object-cover rounded-full"
                    />

                    <StarRating className="justify-center" rating={userDetail.rating ?? 0} max={5}/>
                </div>

                {/* User Details */}
                <div className="flex flex-col flex-1 py-2 px-2 space-y-3 bg-pink-200 rounded-sm">
                    {/* Email */}
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold text-pink-700">Email</p>
                        <p className="text-gray-700 text-lg overflow-hidden text-ellipsis">{userDetail.email}</p>
                    </div>

                    {/* User Stats */}
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            <p className="text-gray-600 font-semibold">Listings:</p>
                            <span className="text-xl font-bold text-emerald-600">{userDetail.totalListings || 0}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <p className="text-gray-600 font-semibold">Trades:</p>
                            <span className="text-xl font-bold text-blue-600">{userDetail.totalTrades || 0}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 pt-2">
                        <button 
                            onClick={() => navigate(`/profile/${userDetail.id}`)}
                            className="flex-1 p-2 rounded-sm bg-emerald-400 hover:bg-emerald-500 text-white font-semibold transition-colors"
                        >
                            View Profile
                        </button>
                        
                        <button 
                            onClick={() => navigate(`/listings/${userDetail.id}`)}
                            className="flex-1 p-2 rounded-sm bg-pink-400 hover:bg-pink-500 text-white font-semibold transition-colors"
                        >
                            View Listings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
