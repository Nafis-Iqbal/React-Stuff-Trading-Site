
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setListingDetailView } from "../../GlobalStateContext/CommonPopUpSlice";
import BasicButton from "./BasicButton";
import LoadingSpinnerBlock from "../LoadingSpinnerBlock";

interface ListingViewProps{
    listingTitle: string;
    description: string;
    listingPhoto: string;
    bidsCount: number;
    listingLocation: string;
    bestBidUserName?: string;
    bestBidUserPhoto?: string;
    bestBidDescription?: string;
    bestBidPrice?: number;
    listingData: Listing;
}

const ListingViewBlock: React.FC<ListingViewProps> = ({
    listingTitle,
    description,
    listingPhoto,
    bidsCount,
    listingLocation,
    bestBidUserName,
    bestBidUserPhoto,
    bestBidDescription,
    bestBidPrice,
    listingData
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openListingDetail = () => {
        dispatch(setListingDetailView({
            isVisible: true,
            listingDetail: listingData
        }))
    }

    return(
        <div className="flex flex-col w-full p-2 bg-pink-100 rounded-md">
            <p className="p-2 ml-1 text-gray-600 text-2xl font-semibold">{listingTitle}</p>

            <div className="flex flex-col md:flex-row w-full">
                <img className="h-[200px] md:h-[300px] w-[100%] md:w-[65%] mr-0 mb-3 md:mr-3 md:mb-0 rounded-sm" src={listingPhoto} alt="Listing"></img>

                <div className="flex flex-col w-[100%] md:w-[35%] py-2 md:pt-8 px-2 space-y-2 bg-pink-200 rounded-sm">
                    <p className="text-gray-600 text-lg md:text-xl">{description}</p>
                    <p className="text-gray-600 font-semibold"><span className="text-xl md:text-2xl font-bold text-green-700">{bidsCount}</span> Bids</p>
                    <p className="text-emerald-600 text-lg font-semibold">{listingLocation}</p>
                    
                    {(bidsCount > 0) && (
                        <div className="flex justify-between w-full p-2 bg-pink-300 rounded-sm">
                            <div className="flex items-center w-[65%] space-x-3">
                                <p className="text-black w-[75%] text-ellipsis">{bestBidDescription}</p>
                                <p className="text-red-600 text-lg font-bold w-[25%]">{bestBidPrice}</p>
                            </div>
                            
                            <div className="flex justify-between items-center w-[35%]">
                                <img src={bestBidUserPhoto} alt="bidder" className="w-[45%] rounded-full"></img>
                                <button onClick={() => navigate("/profile")} className="w-[45%] p-1 text-white overflow-hidden text-ellipsis bg-pink-500 rounded-sm">{bestBidUserName}</button>
                            </div>
                        </div>
                    )}
                    
                    <button className="p-2 rounded-sm bg-emerald-400 hover:bg-emerald-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={() => openListingDetail()}>View Listing</button>
                </div>
            </div>
        </div>
    );
}

export default ListingViewBlock;