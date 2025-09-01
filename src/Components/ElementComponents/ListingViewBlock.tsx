
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";
import { ListingApi } from "../../Services/API";
import { queryClient } from "../../Services/API/ApiInstance";

interface ListingViewProps{
    listingId: number;
    listingTitle: string;
    description: string;
    listingPhoto: string;
    bidsCount: number;
    listingLocation: string;
    bestBidderId: number;
    bestBidUserName?: string;
    bestBidUserPhoto?: string;
    bestBidDescription?: string;
    bestBidPrice?: number;
    isFeatured?: boolean;
    showAdminControls?: boolean;
}

const ListingViewBlock: React.FC<ListingViewProps> = ({
    listingId,
    listingTitle,
    description,
    listingPhoto,
    bidsCount,
    listingLocation,
    bestBidderId,
    bestBidUserName,
    bestBidUserPhoto,
    bestBidDescription,
    bestBidPrice,
    isFeatured = false,
    showAdminControls = false
}) => {
    const navigate = useNavigate();
    
    const {showListingDetail, openNotificationPopUpMessage} = useGlobalUI();

    const {mutate: updateListingMutate} = ListingApi.useUpdateListingRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                queryClient.invalidateQueries(["listing_views"]);
                queryClient.invalidateQueries(["listings"]);
                openNotificationPopUpMessage("Listing featured status updated successfully");
            }
            else{
                openNotificationPopUpMessage("Error updating listing featured status");
            }
        },
        () => {
            openNotificationPopUpMessage("Error updating listing featured status");
        }
    );

    const handleToggleFeatured = () => {
        updateListingMutate({
            id: listingId,
            isFeatured: !isFeatured
        });
    };

    return(
        <div className="flex flex-col w-full p-2 md:py-4 md:px-2 bg-pink-100 rounded-md shadow-lg">
            <p className="p-2 ml-1 text-gray-600 text-2xl font-semibold">{listingTitle}</p>

            <div className="flex flex-col md:flex-row w-full">
                <div className="relative h-[200px] md:h-[300px] w-[100%] md:w-[65%] mr-0 mb-3 md:mr-3 md:mb-0 rounded-sm" >
                    <img
                        src={listingPhoto}
                        alt="Listing"
                        className="w-full h-full object-cover rounded-sm"
                    />
                </div>

                <div className="flex flex-col w-[100%] md:w-[35%] py-2 md:pt-8 px-2 space-y-2 bg-pink-200 rounded-sm">
                    <p className="text-gray-600 text-lg md:text-xl">{description}</p>
                    <p className="text-gray-600 font-semibold"><span className="text-xl md:text-2xl font-bold text-green-700">{bidsCount}</span> Bids</p>
                    <p className="text-emerald-600 text-lg font-semibold">{listingLocation}</p>
                    
                    {(bidsCount > 0) && (
                        <div className="flex justify-between w-full p-2 space-x-2 bg-pink-300 rounded-sm">
                            <div className="flex items-center w-[65%] space-x-3">
                                <p className="text-black w-[75%] text-ellipsis">{bestBidDescription}</p>
                                <p className="text-red-600 text-lg font-bold w-[25%]">{bestBidPrice}</p>
                            </div>
                            
                            <div className="flex justify-between items-center w-[35%]">
                                <img src={bestBidUserPhoto} alt="bidder" className="aspect-square object-cover w-[45%] rounded-full"></img>
                                <button onClick={() => navigate(`/profile/${bestBidderId ?? 0}`)} className="w-[45%] p-1 text-white overflow-hidden text-xs md:text-sm text-ellipsis bg-pink-500 rounded-sm">{bestBidUserName}</button>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex flex-col space-y-2">
                        <button className="p-2 rounded-sm bg-emerald-400 hover:bg-emerald-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={() => showListingDetail(listingId)}>View Listing</button>
                        
                        {showAdminControls && (
                            <button 
                                onClick={handleToggleFeatured}
                                className={`p-2 rounded-sm text-white transition-colors flex items-center justify-center space-x-2 ${
                                    isFeatured 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-yellow-500 hover:bg-yellow-600'
                                }`}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                <span>{isFeatured ? 'Remove Featured' : 'Make Featured'}</span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingViewBlock;