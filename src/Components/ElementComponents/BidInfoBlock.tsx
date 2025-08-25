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
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0 md:space-x-3 w-full min-h-[60px] md:min-h-[80px] p-2 md:p-1 bg-pink-300 rounded-sm">
            <div className="mt-1 md:mt-0 w-full md:w-[40%] flex justify-start items-center 
                space-x-2 md:space-x-3 overflow-hidden"
            >
                <p className="text-sm md:text-base lg:text-xl text-white whitespace-nowrap overflow-hidden text-ellipsis">
                    Bid on
                </p>
                <button 
                    onClick={() => onViewListingClick()} 
                    className="flex-1 md:flex-initial md:w-[70%] px-2 py-1 md:p-2 text-center text-sm md:text-base lg:text-lg text-white bg-emerald-400 hover:bg-emerald-500 rounded-sm whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    {listingName}
                </button>
            </div>
            
            <div className="flex w-full md:mr-2 md:w-[60%] min-w-0 justify-between items-center space-x-2 md:space-x-3 overflow-hidden">
                <p className="w-[75%] text-sm md:text-base lg:text-lg text-gray-700 text-ellipsis overflow-hidden">
                    {description}
                </p>
                <p className="w-[20%] text-center md:mr-2 md:flex-shrink-0 md:text-lg lg:text-xl text-red-500 font-semibold md:font-bold whitespace-nowrap">
                    {bidPrice ?? "N/A"}
                </p>
            </div>
        </div>

    )
}

export default BidInfoBlock;