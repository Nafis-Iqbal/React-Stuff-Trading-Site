import { useState } from "react";

interface TradeInfoProp{
    listingName: string;
    buyerName: string;
    tradeItems?: string;
    tradePrice?: number;
    onViewListingClick: () => void;
}

const TradeInfoBlock: React.FC<TradeInfoProp> = ({listingName, buyerName, tradeItems, tradePrice, onViewListingClick}) => {
    return (
        <div className="flex justify-between items-center min-h-[80px] p-1 bg-pink-300 rounded-sm">
            <div className="flex flex-col md:flex-row space-x-3">
                <p className="p-1 ml-2 text-lg md:text-xl text-white">Traded from</p>
                <button className="p-2 text-white bg-emerald-400 hover:bg-emerald-500 rounded-sm" onClick={onViewListingClick}>{listingName}</button>
                <p className="p-1 mx-2 text-lg md:text-xl text-white">with </p>
                <button className="p-2 mb-1 md:mb-0 text-white bg-pink-600 hover:bg-pink-700 rounded-sm">{buyerName}</button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-end items-center w-[35%] space-x-1 md:space-x-3 mr-2">
                <p className="p-1 text-lg md:text-xl text-emerald-700">{tradeItems ?? "N/A"}</p>
                <p className="p-1 text-lg md:text-xl text-red-700">{tradePrice ?? "N/A"}</p>
            </div>
        </div>
    )
}

export default TradeInfoBlock;