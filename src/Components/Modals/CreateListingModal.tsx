import React, { useEffect, useState } from "react";

import { isNumber } from "../../Utilities/Utilities";
import { listingStatus } from "../../Types&Enums/Enums";
import { ListingApi } from "../../Services/API";
import { queryClient } from "../../Services/API/ApiInstance";

interface CreateListingModalProps{
    user_id: number;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onSuccess: (data: Listing) => void;
    onFailure: () => void;
}

const CreateListingModal: React.FC<CreateListingModalProps> = ({user_id, isOpen, onClose, onSubmit, onSuccess, onFailure}) => {
    
    const[formData, setFormData] = useState<Listing>({
        id: 0,
        user_id: (user_id ?? 0),
        title: '',
        description: '',
        location: '',
        exchange_items: '',
        price: 0,
        status: listingStatus.available
    });

    const {mutate: createListingMutate} = ListingApi.useCreateListingRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                onSuccess(formData);
                queryClient.invalidateQueries(["listings"]);

                setFormData({
                    id: 0,
                    user_id: (user_id ?? 0),
                    title: '',
                    description: '',
                    location: '',
                    exchange_items: '',
                    price: 0,
                    status: listingStatus.available
                });
            }
            else{
                onFailure();
            }
        },
        () => {
            onFailure();
        }
    ); 

    useEffect(() => {

    }, []);

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

        onSubmit();
        
        createListingMutate(formData);
        onClose();
    }

    const handleClose = () => {
        setFormData({
            id: 0,
            user_id: (user_id ?? 0),
            title: '',
            description: '',
            location: '',
            exchange_items: '',
            price: 0,
            status: listingStatus.available
        });

        onClose();
    }

    if(!isOpen)return null;

    return (
        <div className="fixed inset-0 -top-4 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-pink-200 rounded-lg p-6 shadow-lg w-full max-w-lg">
                <h2 className="text-2xl text-pink-800 font-semibold mb-4">Create Listing</h2>

                <form onSubmit={(e) => handleSubmit(e)}> {/* Delegate form submission to parent */}
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
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Listing Description */}
                    <div className="mb-4">
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
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Listing Location */}
                    <div className="mb-4">
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
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Listing Exchange Items */}
                    <div className="mb-4">
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
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Listing Price */}
                    <div className="mb-4">
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
                            className="mt-1 block w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

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
    );
}

export default CreateListingModal;