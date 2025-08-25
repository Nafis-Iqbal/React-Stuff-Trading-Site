import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../Services/API/ApiInstance";
import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";
import { TradeApi, RatingApi } from "../../Services/API";
import { tradeStatus } from "../../Types&Enums/Enums";

import RatingInputModal from "../Modals/RatingInputModal";

interface TradeInfoProp{
    hideRateButton?: boolean;
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
    updatedAt?: string;
}

const TradeInfoBlock: React.FC<TradeInfoProp> = ({
    hideRateButton = false,
    trade_id, 
    own_user_id, 
    listing_id, 
    listingName, 
    buyer_name, 
    buyer_id, 
    seller_name, 
    seller_id, 
    trade_status, 
    tradePrice,
    updatedAt
}) => {
    const navigate = useNavigate();

    const [isUserRatingModalOpen, setIsUserRatingModalOpen] = useState(false);
    const [awardedUserRating, setAwardedUserRating] = useState<number>(0);

    const {showListingDetail, showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

    const {mutate: createUserRating} = RatingApi.useCreateRatingRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                showLoadingContent(false);
                openNotificationPopUpMessage("Rating submitted successfully.");
                queryClient.invalidateQueries(["user_trades", seller_id]);
                queryClient.invalidateQueries(["user_trades", buyer_id]);
                queryClient.invalidateQueries(["trades", buyer_id]);
            }
            else{
                openNotificationPopUpMessage("Failed to submit rating.");
            }
        },
        () => {
            openNotificationPopUpMessage("Failed to submit rating.");
        }
    );

    const {mutate: updateTradeStatusMutate} = TradeApi.useUpdateTradeRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                showLoadingContent(false);
                openNotificationPopUpMessage("Trade status updated successfully.");
                queryClient.invalidateQueries(["user_trades", seller_id]);
                queryClient.invalidateQueries(["user_trades", buyer_id]);
                queryClient.invalidateQueries(["trades", buyer_id]);
            }
            else{
                onTradeCancellationFailure();
            }
        },
        () => {
            onTradeCancellationFailure();
        }
    );

    useEffect(() => {
        console.log("seller_id:");
        console.log(seller_id);
    }, [seller_id]);

    const onCompleteTrade = (trade_id: number) => {
        updateTradeStatusMutate({ id: trade_id, status: tradeStatus.completed });
        showLoadingContent(true);
    }

    const onCancelTrade = (trade_id: number) => {
        updateTradeStatusMutate({ id: trade_id, status: tradeStatus.cancelled });
        showLoadingContent(true);
    }

    const onTradeCancellationFailure = () => {
        showLoadingContent(false);
        openNotificationPopUpMessage("Failed to cancel trade.");
    }

    const onRatingApplyConfirm = () => {
        setIsUserRatingModalOpen(false);
        createUserRating({listing_id, trade_id, rating_taker_id: seller_id, rating: awardedUserRating})
    }

    const isTradeCancelled = trade_status !== tradeStatus.completed && trade_status !== tradeStatus.pending;
    const isTradeCompleted = trade_status === tradeStatus.completed;

    return (
        <div className="flex flex-col md:flex-row justify-between md:items-center min-h-[80px] md:min-h-[80px] p-2 md:p-1 bg-pink-300 rounded-sm space-y-2 md:space-y-0">
            <RatingInputModal
                isVisible={isUserRatingModalOpen}
                message={`Rate your experience with ${seller_name}`}
                onConfirm={onRatingApplyConfirm}
                onCancel={() => setIsUserRatingModalOpen(false)}
                setRating={setAwardedUserRating}
            />
            
            <div className="flex flex-col md:items-center md:flex-row md:space-x-2 lg:space-x-3 space-y-1 md:space-y-0">
                <p className="text-sm md:text-base self-center lg:text-xl text-white">{(trade_status === tradeStatus.pending) ? ("Trading from") : ("Traded from")}</p>

                <button 
                    onClick={() => showListingDetail(listing_id)} 
                    className="px-2 py-1 md:p-2 text-xs md:text-sm lg:text-base text-white bg-emerald-400 hover:bg-emerald-500 rounded-sm"
                >
                    {listingName}
                </button>
                
                <p className="text-sm md:text-base self-center lg:text-xl text-white">{
                    (own_user_id === buyer_id) ? (trade_status === tradeStatus.pending) ? "Buying from" : "Bought from"
                    : (trade_status === tradeStatus.pending) ? "Selling to" : "Sold to"
                }</p>
                
                <button 
                    onClick={() => navigate(`/profile/${(own_user_id === seller_id) ? buyer_id : seller_id}`)} 
                    className="px-2 py-1 md:p-2 text-xs md:text-sm lg:text-base text-white bg-pink-600 hover:bg-pink-700 rounded-sm"
                >
                    {(own_user_id === seller_id) ? buyer_name : seller_name}
                </button>

                <p className="hidden md:block text-gray-600 text-xs md:text-sm ">Updated at:&nbsp;{updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}</p>
            </div>
            
            <div className="flex flex-col items-end space-y-2 md:space-y-3">
                <p className="text-sm md:text-base lg:text-xl text-red-700 font-medium"><span className="text-white font-normal">Amount:&nbsp;</span>{tradePrice ?? "N/A"}</p>

                {(isTradeCancelled || isTradeCompleted) && 
                    <div className="flex justify-between items-center md:space-x-2 w-full">
                        {!hideRateButton &&
                            <button 
                                className="px-2 py-1 md:py-2 md:px-3 text-xs md:text-sm text-white
                                bg-pink-400 hover:bg-emerald-600 rounded-sm"
                                onClick={() => setIsUserRatingModalOpen(true)}
                            >
                                Rate this user
                            </button>
                        }

                        <p className="md:hidden text-gray-600 text-xs md:text-sm ">Updated at:&nbsp;{updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}</p>

                        {isTradeCancelled ? 
                            (<div className="px-2 py-1 md:py-2 md:px-3 text-xs md:text-sm font-bold 
                                text-red-500 border-red-500 border-2 rounded-sm">Trade Cancelled</div>) :
                            trade_status === tradeStatus.completed ? 
                            (<div className="px-2 py-1 md:py-2 md:px-3 text-xs md:text-sm font-bold
                                text-emerald-500 border-emerald-500 border-2 rounded-sm">Trade Completed</div>) :
                            (<></>)
                        }
                    </div>
                }

                {own_user_id === seller_id && trade_status === tradeStatus.pending && (
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => onCompleteTrade(trade_id)} 
                            className="px-2 py-1 md:py-2 md:px-3 text-xs md:text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded-sm"
                        >
                            Complete Trade
                        </button>

                        <button 
                            onClick={() => onCancelTrade(trade_id)} 
                            className="px-2 py-1 md:py-2 md:px-3 text-xs md:text-sm text-white bg-red-600 hover:bg-red-700 rounded-sm"
                        >
                            Cancel Trade
                        </button>
                    </div>
                )}
                {own_user_id === buyer_id && trade_status === tradeStatus.pending && (
                    <button 
                        onClick={() => onCancelTrade(trade_id)} 
                        className="px-2 py-1 md:py-2 md:px-3 text-xs md:text-sm text-white bg-red-600 hover:bg-red-700 rounded-sm"
                    >
                        Cancel Bid
                    </button>
                )}
            </div>
        </div>
    )
}

export default TradeInfoBlock;