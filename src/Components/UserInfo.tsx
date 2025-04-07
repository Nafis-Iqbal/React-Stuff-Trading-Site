import {useEffect, useState} from 'react';
import { queryClient } from '../Services/API/ApiInstance';
import { useGetAuthenticatedUserRQ } from '../Services/API/UserApi';
import ProfilePicture from './StructureComponents/ProfilePicture';
import makeFirstLetterUppercase from '../Utilities/Utilities';
import EditUserModal from '../Components/Modals/EditUserInfoModal';
import { checkIfSubstring } from '../Utilities/Utilities';

const UserInfo = ({profilePicture, customStyle} : {profilePicture: string, customStyle?: string}) => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [canEditInfo, setCanEditInfo] = useState(true); 

  const {data: userData} = useGetAuthenticatedUserRQ();

  const openEditUserForm = () => {
    setIsEditUserOpen(true);
  }

  const onEditUserSubmit = () => {
    //setLoadingContentOpen(true);
  }

  const onEditUserSuccess = (formData: User) => {
    //setLoadingContentOpen(false);

    openNotificationPopUpMessage("User info updated successfully!");

    queryClient.invalidateQueries(["user"]);
  }

  const onEditUserFailure = () => {
    //setLoadingContentOpen(false);
    openNotificationPopUpMessage("Error updating User info!");
  }

  const openNotificationPopUpMessage = (popUpMessage: string) => {
    //setNotificationPopupOpen(true);
    //setNotificationMessage(popUpMessage);
  }

  useEffect(() => {
    console.log(userData?.data.data);
    if(checkIfSubstring(userData?.data.data.user_name ?? '', "Guest")){
      setCanEditInfo(false);
    }
  },[userData]);

  return (
    <div className={`rounded-lg space-y-3 shadow-sm ${customStyle}`}>
      <ProfilePicture src={profilePicture} customStyle="mb-2"/>
      <h3 className="mb-4 text-2xl font-bold text-pink-900">{userData?.data.data.user_name ?? "Nafis"}</h3>

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
              <td className='text-xl font-semibold bg-pink-200 rounded-md'>
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

export default UserInfo;
