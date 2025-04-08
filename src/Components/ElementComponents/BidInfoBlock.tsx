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
        <div className="flex justify-between items-center w-full min-h-[80px] p-1 space-x-3 bg-pink-300 rounded-sm">
            <div className="flex w-[40%] space-x-1 md:space-x-3">
                <p className="w-[30%] p-1 text-lg md:text-xl text-white">Bid on</p>
                <button onClick={() => onViewListingClick()} className="w-[70%] p-2 text-center text-base md:text-lg text-white bg-emerald-400 hover:bg-emerald-500 rounded-sm truncate">{listingName}</button>
            </div>
            
            <div className="flex w-[60%] items-center space-x-1 md:space-x-3">
                <p className="w-[80%] p-1 text-center text-base md:text-lg text-gray-700 truncate">{description}</p>
                <p className="w-[20%] p-1 text-lg md:text-xl text-red-500 font-bold">{bidPrice ?? "N/A"}</p>
            </div>
        </div>
    )
}

export default BidInfoBlock;