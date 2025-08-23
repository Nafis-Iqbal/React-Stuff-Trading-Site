import { useState } from "react";
import { Link } from "react-router-dom";

interface BidInfoProp{
    listingName: string;
    description: string;
    bidPrice?: number;
    onViewListingClick: () => void;
}

const BidInfoBlock: React.FC<BidInfoProp> = ({listingName, description, bidPrice, onViewListingClick}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0 md:space-x-3 w-full min-h-[80px] p-1  bg-pink-300 rounded-sm">
            <div className="mt-2 md:mt-0 w-[60%] md:w-[40%] flex justify-start items-center 
                space-x-1 md:space-x-3 overflow-hidden"
            >
                <p className="md:w-[30%] p-1 text-base md:text-xl text-white whitespace-nowrap overflow-hidden text-ellipsis">
                    Bid on
                </p>
                <button 
                    onClick={() => onViewListingClick()} 
                    className="md:w-[70%] p-2 text-center text-base md:text-lg text-white bg-emerald-400 hover:bg-emerald-500 rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {listingName}
                </button>
            </div>
            
            <div className="flex w-[100%] md:w-[60%] min-w-0 justify-start items-center space-x-1 md:space-x-3 overflow-hidden">
                <p className="w-[80%] p-1 text-base md:text-lg text-gray-700 text-ellipsis">
                    {description}
                </p>
                <p className="w-[20%] p-1 text-lg md:text-xl text-red-500 font-bold whitespace-nowrap">
                    {bidPrice ?? "N/A"}
                </p>
            </div>
        </div>

    )
}

export default BidInfoBlock;