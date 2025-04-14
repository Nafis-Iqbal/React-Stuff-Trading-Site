// src/components/UploadImage.tsx
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { queryClient } from "../../Services/API/ApiInstance";
import ReactDOM from "react-dom";

import { UserApi } from "../../Services/API";
import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";

const MAX_SIZE_MB = 1; // e.g., 2MB
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const UploadImageModal: React.FC = () => {
    const uploadPicState: {isVisible: boolean, pic_url: string} = useSelector((state: any) => state.popUps.photoUploadView);

    const {openPhotoUploadWindow, openNotificationPopUpMessage, showLoadingContent} = useGlobalUI();
    const [savedImageUrl, setSavedImageUrl] = useState("");
    const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ();

    const {mutate: updateUserPictureMutate} = UserApi.useUpdateUserRQ(
        (responseData) => {
            if(responseData.data.status === "success"){
                queryClient.invalidateQueries(["user"]);

                showLoadingContent(false);
                openNotificationPopUpMessage("Image successfully saved into db.");
            }
            else{
                onPicUpdateFailure();
            }
        },
        () => {
            onPicUpdateFailure();
        }
    );

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_SIZE_BYTES) {
            alert(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
            return;
        }
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET ?? '');
        formData.append("folder", uploadPicState.pic_url);

        try {
            showLoadingContent(true);
            const res = await axios.post(
                process.env.REACT_APP_PIC_HOST ?? "",
                formData
            );

            setSavedImageUrl(res.data.secure_url);

            openPhotoUploadWindow(false);
            
            updateUserPictureMutate({
                ...ownUserData?.data.data,
                profile_picture: res.data.secure_url
            })
            //showLoadingContent(false);
            //openNotificationPopUpMessage("Uploaded image successfully");
        } catch (err) {
            console.error("Upload failed:", err);
            
            openPhotoUploadWindow(false);
            showLoadingContent(false);
            openNotificationPopUpMessage("Image upload failed.");
        }
    };

    const onPicUpdateFailure = () => {
        showLoadingContent(false);
        openNotificationPopUpMessage("Image saving into db failed.");
    }

    if(!uploadPicState.isVisible) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-pink-300 border-4 border-pink-500 p-6 rounded-xl shadow-xl max-w-md w-full relative">
                <button onClick={() => openPhotoUploadWindow(false)} className="absolute top-2 right-3 text-xl font-bold">×</button>
                
                <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>
                
                {uploadPicState.pic_url && (<input type="file" accept="image/*" onChange={handleUpload} />)}
                
                {savedImageUrl && <img src={savedImageUrl} alt="Uploaded" className="mt-4 w-48 rounded-md" />}
            </div>
        </div>
    , document.body);
};

export default UploadImageModal;
