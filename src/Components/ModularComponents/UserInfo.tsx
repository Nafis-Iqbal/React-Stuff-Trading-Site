import {useEffect, useState} from 'react';

import { queryClient } from '../../Services/API/ApiInstance';
import { UserApi } from '../../Services/API';
import makeFirstLetterUppercase, { checkIfSubstring } from '../../Utilities/Utilities';
import { useGlobalUI } from '../../Hooks/StateHooks/GlobalStateHooks';

import ProfilePicture from './../StructureComponents/ProfilePicture';
import EditUserModal from '../../Components/Modals/EditUserInfoModal';

const UserInfoModule = ({userId, profilePicture, customStyle} : {userId: number, profilePicture: string, customStyle?: string}) => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [canEditInfo, setCanEditInfo] = useState(true); 
  const {showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

  const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ();

  const {data: userData} = UserApi.useGetUserDetailRQ(
    userId,
    (userId > 0)
  );

  const openEditUserForm = () => {
    setIsEditUserOpen(true);
  }

  const onEditUserSubmit = () => {
    showLoadingContent(true);
  }

  const onEditUserSuccess = (formData: User) => {
    showLoadingContent(false);

    openNotificationPopUpMessage("User info updated successfully!");

    queryClient.invalidateQueries(["user"]);
  }

  const onEditUserFailure = () => {
    showLoadingContent(false);
    openNotificationPopUpMessage("Error updating User info!");
  }

  useEffect(() => {
    if(userData?.data.data && ownUserData?.data.data && (checkIfSubstring(userData?.data.data.user_name ?? '', "Guest") || ownUserData?.data.data.id !== userId)){
      setCanEditInfo(false);
    }
  },[userData, ownUserData, userId]);

  return (
    <div className={`rounded-lg space-y-3 shadow-sm ${customStyle}`}>
      <ProfilePicture own_user_id={ownUserData?.data.data.id} picture_user_id={userId} src={profilePicture} customStyle="mb-2"/>
      
      <h3 className="mb-4 text-2xl font-bold text-pink-900">{userData?.data.data.user_name ?? "Fix user name"}</h3>

      <EditUserModal
        isOpen={isEditUserOpen}
        defaultUserInfo={userData? userData?.data.data : {name: '', phone_number: ''}}
        onClose={() => setIsEditUserOpen(false)}
        onSubmit={onEditUserSubmit}
        onSuccess={onEditUserSuccess}
        onFailure={onEditUserFailure}
      />

      <div className=''>
        <table className='w-1/4 border-collapse relative'>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='space-y-3'>
            <tr className='space-x-4'>
              <td className='text-xl font-semibold'>
              {makeFirstLetterUppercase(userData?.data.data.usr_name)}
              </td>
            </tr>

            <tr>
              <td className='text-lg md:text-xl text-gray-700'>
                <strong>Role:</strong>
              </td>
              <td className='text-xl font-bold text-pink-800 rounded-md'>
                {makeFirstLetterUppercase(userData?.data.data.role)}
              </td>
            </tr>

            <tr>
              <td className='text-lg md:text-xl text-gray-700'>
              <strong>Phone:</strong>
              </td>
              <td className='text-xl text-pink-900 font-semibold'>
              {userData?.data.data.phone_number ?? "01900000000"}
              </td>
            </tr>
          </tbody>

          {canEditInfo && (<button
            className="absolute bottom-0 right-0 translate-x-10 translate-y-1 bg-pink-600 text-white p-1 rounded-lg hover:bg-pink-500"
            onClick={() => openEditUserForm()}
          >
            Edit
          </button>)}
        </table>

        
      </div>

    </div>
  );
};

export default UserInfoModule;
