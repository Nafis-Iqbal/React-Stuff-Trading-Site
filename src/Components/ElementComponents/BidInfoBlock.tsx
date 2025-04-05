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
        <div className="flex justify-between items-center w-full min-h-[80px] p-1 bg-pink-300 rounded-sm">
            <div className="flex space-x-3">
                <p className="p-1 ml-2 text-lg md:text-xl text-white">Bid on</p>
                <button className="p-2 text-white bg-emerald-400 hover:bg-emerald-500 rounded-sm">{listingName}</button>
            </div>
            
            <div className="flex items-center space-x-1 md:space-x-3 mr-2">
                <p className="p-1 text-lg md:text-xl text-gray-700">{description}</p>
                <p className="p-1 text-lg md:text-xl text-gray-700">{bidPrice ?? "N/A"}</p>
            </div>
        </div>
    )
}

export default BidInfoBlock;