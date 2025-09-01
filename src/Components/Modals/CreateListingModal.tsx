import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { isNumber } from "../../Utilities/Utilities";
import { listingStatus } from "../../Types&Enums/Enums";
import { ListingApi } from "../../Services/API";
import { queryClient } from "../../Services/API/ApiInstance";
import { ImageUploadModule } from "../ModularComponents/ImageUploadModule";
import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";
import ReactDOM from "react-dom";

interface CreateListingModalProps{
    user_id: number;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: Listing) => void;
    onFailure: () => void;
}

const defaultListingForm: Listing = {
    id: 0,
    user_id: 0,
    title: '',
    description: '',
    location: '',
    exchange_items: '',
    price: 0,
    isFeatured: false,
    status: listingStatus.available
};

const CreateListingModal: React.FC<CreateListingModalProps> = ({user_id, isOpen, onClose, onSuccess, onFailure}) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [newListingId, setNewListingId] = useState<number | null>(null);
    const [imageReadyForUpload, setImageReadyForUpload] = useState<boolean>(false);

    const[formData, setFormData] = useState<Listing>({...defaultListingForm, user_id});

    const {showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

    const {mutate: createListingMutate} = ListingApi.useCreateListingRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                onSuccess(formData);
                openNotificationPopUpMessage("Listing created. Checking image upload status...")
                queryClient.invalidateQueries(["listings"]);
                
                if(imageReadyForUpload) {
                    showLoadingContent(true);
                    setNewListingId(responseData.data.data.id);
                }

                if(!imageReadyForUpload){
                    endWithNotification("Listing created successfully!");
                    setFormData({...defaultListingForm, user_id});
                    onClose();
                    setNewListingId(null);
                }
            }
            else{
                onFailure();
                endWithNotification("Failed to create listing. Try again");
            }
        },
        () => {
            onFailure();
            endWithNotification("Failed to create listing. Try again");
        }
    );

    const {mutate: updateListingImagesMutate} = ListingApi.useUpdateListingRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                onSuccess(formData);
                endWithNotification("Listing images uploaded successfully!");
                queryClient.invalidateQueries(["listings"]);
                
                setFormData({...defaultListingForm, user_id});
                setNewListingId(null);
                onClose();
                navigate(location.pathname, { replace: true });
            }
            else{
                onFailure();
                endWithNotification("Failed to upload listing images. Error Response. Try to update listing later");
            }
        },
        () => {
            onFailure();
            endWithNotification("Failed to upload listing images. No Response. Try to update listing later");
        }
    );

    const {mutate: deleteListingImagesMutate} = ListingApi.useDeleteListingImagesRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                onSuccess(formData);
                endWithNotification("Listing deleted successfully!");
                queryClient.invalidateQueries(["listings"]);
            }
            else{
                onFailure();
                endWithNotification("Failed to delete listing. Try again");
            }
        },
        () => {
            onFailure();
            endWithNotification("Failed to delete listing. Try again");
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let {name, value} = e.target;
        
        if(name === "price"){
            if(!isNumber(value)){
                value = String(formData.price);
            }
            else value = value.replace(/^0+/, "");
        }
        
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'end_date' ? new Date(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        showLoadingContent(true);
        
        createListingMutate(formData);
    }

    const handleClose = () => {
        setFormData({...defaultListingForm, user_id});

        onClose();
    }

    const endWithNotification = (message: string) => {
        showLoadingContent(false);
        console.log("where??");
        openNotificationPopUpMessage(message);
    }

    if(!isOpen)return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 -top-4 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-pink-200 rounded-lg p-6 shadow-lg w-full max-w-lg">
                <h2 className="text-2xl text-pink-800 font-semibold mb-4">Create Listing</h2>

                <form className="flex flex-col space-y-4" onSubmit={(e) => handleSubmit(e)}> {/* Delegate form submission to parent */}
                    {/* Listing Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-3 text-base md:text-lg font-medium text-gray-700">
                            Listing Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Listing Description */}
                    <div className="">
                        <label htmlFor="description" className="block mb-3 text-base md:text-lg font-medium text-gray-700">
                            Listing Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Listing Location */}
                    <div className="">
                        <label htmlFor="location" className="block mb-3 text-base md:text-lg font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Listing Exchange Items */}
                    <div className="">
                        <label htmlFor="exchange_items" className="block mb-3 text-base md:text-lg font-medium text-gray-700">
                            Exchange Items
                        </label>
                        <input
                            type="text"
                            id="exchange_items"
                            name="exchange_items"
                            value={formData.exchange_items}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Listing Price */}
                    <div className="">
                        <label htmlFor="price" className="block mb-3 text-base md:text-lg font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <ImageUploadModule
                        MAX_FILES={3}
                        imageUploadMode="create"
                        setFileReadyState={setImageReadyForUpload}
                        actionTrigger={true}
                        resourceId={newListingId}
                        resourceLabel="Upload Listing Images"
                        resourceLabelStyle="text-base md:text-lg text-pink-600 font-medium"
                        pic_url_Builder={(resourceId) => `stuff-trader/listings/${resourceId}/images`}
                        updateResourceMutation={({ id, imageURLs } : {id: number, imageURLs: string[]}) => updateListingImagesMutate({ id, imageURLs })}
                        deleteResourceMutation={({ id, imageIds } : {id: number, imageIds: number[]}) => deleteListingImagesMutate({ id, imageIds }) }
                    />

                    {/* Submit Button */}
                    <div className="flex justify-between">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-emerald-400 text-white rounded-md hover:bg-emerald-500"
                        >
                            Create Listing
                        </button>
                    </div>
                </form>          
            </div>
        </div>
    , document.body);
}

export default CreateListingModal;