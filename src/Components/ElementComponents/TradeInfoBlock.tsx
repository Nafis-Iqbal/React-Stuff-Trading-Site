import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../Services/API/ApiInstance";

import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";
import { TradeApi } from "../../Services/API";
import { tradeStatus } from "../../Types&Enums/Enums";

interface TradeInfoProp{
    trade_id: number;
    own_user_id: number;
    listingName: string;
    listing_id: number;
    buyer_id: number;
    buyer_name: string;
    seller_id: number;
    seller_name: string;
    trade_status: tradeStatus;
    tradePrice?: number;
}

const TradeInfoBlock: React.FC<TradeInfoProp> = ({trade_id, own_user_id, listing_id, listingName, buyer_name, buyer_id, seller_name, seller_id, trade_status, tradePrice}) => {
    const navigate = useNavigate();
    const {showListingDetail, showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

    const {mutate: deleteTradeMutate} = TradeApi.useDeleteTradeRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                showLoadingContent(false);
                openNotificationPopUpMessage("Trade cancelled successfully.");
                queryClient.invalidateQueries(["user_trades", seller_id]);
                queryClient.invalidateQueries(["user_trades", buyer_id]);
            }
            else{
                onTradeCancellationFailure();
            }
        },
        () => {
            onTradeCancellationFailure();
        }
    );

    const onTradeCancellationFailure = () => {
        showLoadingContent(false);
        openNotificationPopUpMessage("Failed to cancel trade.");
    }

    const onCancelTrade = (trade_id: number) => {
        deleteTradeMutate(trade_id);
        showLoadingContent(true);
    }

    return (
        <div className="flex justify-between items-center min-h-[80px] p-1 bg-pink-300 rounded-sm">
            <div className="flex flex-col md:flex-row space-x-3">
                <p className="p-1 ml-2 text-lg md:text-xl text-white">{(trade_status === tradeStatus.pending) ? ("Trading from") : ("Traded from")}</p>

                <button onClick={() => showListingDetail(listing_id)} className="p-2 text-white bg-emerald-400 hover:bg-emerald-500 rounded-sm">{listingName}</button>
                
                <p className="p-1 mx-2 text-lg md:text-xl text-white">{
                    (own_user_id === buyer_id) ? (trade_status === tradeStatus.pending) ? "Buying from" : "Bought from"
                    : (trade_status === tradeStatus.pending) ? "Selling to" : "Sold to"
                }</p>
                
                <button onClick={() => navigate(`/profile/${(own_user_id === seller_id) ? buyer_id : seller_id}`)} className="p-2 mb-1 md:mb-0 text-white bg-pink-600 hover:bg-pink-700 rounded-sm">{(own_user_id === seller_id) ? buyer_name : seller_name}</button>
            </div>
            
            <div className="flex flex-col md:flex-row justify-end items-center w-[35%] space-x-1 md:space-x-3 mr-2">
                <p className="p-1 text-lg md:text-xl text-red-700">{tradePrice ?? "N/A"}</p>

                {(own_user_id === seller_id) && (<button onClick={() => onCancelTrade(trade_id)} className="py-2 px-3 bg-red-600 hover:bg-red-700 rounded-sm">Cancel Trade</button>)}
                {(own_user_id === buyer_id) && (<button onClick={() => onCancelTrade(trade_id)} className="py-2 px-3 bg-red-600 hover:bg-red-700 rounded-sm">Cancel Bid</button>)}
            </div>
        </div>
    )
}

export default TradeInfoBlock;