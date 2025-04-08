import { useState } from "react";
import { Link } from "react-router-dom";

interface ListingInfoProp{
    name: string;
    bidsCount: number;
    highestBidPrice?: number;
    onClick: () => void;
}

const ListingInfoBlock: React.FC<ListingInfoProp> = ({name, bidsCount, highestBidPrice, onClick}) => {
    return (
        <button className="flex justify-between items-center w-full min-h-[80px] p-1 bg-pink-300 hover:bg-pink-400 rounded-sm" onClick={() => onClick()}>
            <p className="p-1 ml-2 text-lg md:text-xl text-white">{name}</p>
            
            <div className="flex items-center space-x-3 mr-2">
                <p className="p-1 text-lg md:text-xl text-gray-700"><span className="text-xl md:text-2xl text-emerald-500 font-bold">{bidsCount}</span> bids</p>
                
                <div className="flex flex-col">
                    <p className="font-bold text-pink-700">Max Bid</p>

                    <p className="p-1 text-lg md:text-xl text-red-600">{highestBidPrice ?? "N/A"}</p>
                </div>
            </div>
        </button>
    )
}

export default ListingInfoBlock;