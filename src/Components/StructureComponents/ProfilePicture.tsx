import React from 'react';

import { useGlobalUI } from '../../Hooks/StateHooks/GlobalStateHooks';

const ProfilePicture = ({ own_user_id, picture_user_id, src, customStyle } : {own_user_id: number, picture_user_id: number, src: string, customStyle?: string}) => {
  const {openPhotoUploadWindow} = useGlobalUI();

  return (
    <div className={`w-32 h-32 rounded-lg overflow-hidden relative ${customStyle}`}>
      <img src={src} alt="User profile" className="object-cover w-full h-full"/>

      {(own_user_id === picture_user_id) && (
        <button
            className="absolute bottom-0 right-0 bg-pink-600 hover:bg-pink-500 text-white p-1 rounded-lg"
            onClick={() => openPhotoUploadWindow(true, ("user_dp/" + String(own_user_id)))}
          >
            Edit
        </button>
      )}
    </div>
  );
};

export default ProfilePicture;
