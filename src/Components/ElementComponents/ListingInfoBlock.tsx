import { useState } from "react";
import { Link } from "react-router-dom";

interface ListingInfoProp{
    name: string;
    bidsCount: number;
    highestBidPrice: number;
    onClick: () => void;
}

const ListingInfoBlock: React.FC<ListingInfoProp> = ({name, bidsCount, highestBidPrice, onClick}) => {
    return (
        <button className="flex justify-between items-center w-full min-h-[60px] md:min-h-[80px] p-2 md:p-1 bg-pink-300 hover:bg-pink-400 rounded-sm" onClick={() => onClick()}>
            <p className="px-1 ml-1 md:ml-2 text-base md:text-lg lg:text-xl text-white overflow-hidden text-ellipsis">{name}</p>
            
            <div className="flex items-center space-x-2 md:space-x-3 mr-1 md:mr-2">
                <p className="text-sm md:text-base lg:text-xl text-gray-700">
                    <span className="text-base md:text-lg lg:text-2xl text-emerald-500 font-semibold md:font-bold">{bidsCount}</span> bids
                </p>
                
                <div className="flex flex-col items-end">
                    <p className="text-xs md:text-sm font-semibold md:font-bold text-pink-700">Max Bid</p>
                    <p className="text-sm md:text-base lg:text-xl text-red-600 font-medium">{highestBidPrice > 0 ? highestBidPrice : "N/A"}</p>
                </div>
            </div>
        </button>
    )
}

export default ListingInfoBlock;