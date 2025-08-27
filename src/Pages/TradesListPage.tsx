import React from "react";

import { TradeApi, UserApi } from "../Services/API";
import { useParams } from "react-router-dom";

import TradeInfoBlock from "../Components/ElementComponents/TradeInfoBlock";

const TradesListPage:React.FC = () => {
    const { userId } = useParams();
    const parsedUserId = Number(userId);

    const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ({});

    const {data: tradeListData} = TradeApi.useGetUserTradeViewsRQ(
        parsedUserId,
        (parsedUserId > 0)
    );

    const tradeList = tradeListData?.data.data;

    const pendingTrades = tradeList?.filter((trade: Trade) => trade.status === "pending");
    const completedTrades = tradeList?.filter((trade: Trade) => (trade.status !== "pending"));

    return (
        <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 text-white min-h-screen">
            <div className="md:hidden min-h-[30px] bg-pink-200"></div>

            <main className="flex flex-col w-[100%] md:w-[60%] h-full bg-pink-200">
                <div className="flex justify-between items-center">
                    <h1 className="p-3 md:p-4 ml-2 mt-2 bg-pink-300 text-2xl md:text-3xl text-white font-semibold rounded-sm">Trades</h1>

                    <div className="p-2 md:p-3 mr-2 bg-white text-lg md:text-xl text-emerald-700 border-4 border-emerald-500 font-semibold rounded-md">Own Trades</div>
                </div>

                <h2 className="ml-4 mt-10 mb-3 text-xl md:text-2xl text-pink-600 font-semibold rounded-sm">Pending Trades</h2>
                <ul className="p-3 mx-2 mb-2 space-y-3 bg-pink-100 rounded-lg">
                    {(pendingTrades && pendingTrades.length > 0) && (
                        pendingTrades.map((trade: Trade) => {
                            return (
                                <li>
                                    <TradeInfoBlock 
                                        trade_id={trade.id}
                                        own_user_id={ownUserData?.data.data.id}
                                        listingName={trade?.listing_title ?? "Fix Listing Name"}
                                        listing_id={trade.listing_id}
                                        buyer_id={trade.buyer_id} 
                                        buyer_name={trade?.buyer_name ?? "Fix Buyer Name"}
                                        seller_id={trade.seller_id}
                                        seller_name={trade?.seller_name ?? "Fix Seller Name"}
                                        trade_status={trade.status}
                                        tradePrice={trade.amount}
                                        updatedAt={trade.updatedAt.toString()}
                                    />
                                </li>
                            )
                        })
                    )}
                </ul>
                
                <h2 className="ml-4 mt-5 mb-3 text-xl md:text-2xl text-pink-600 font-semibold rounded-sm">Completed Trades</h2>
                <ul className="p-3 mx-2 mb-2 space-y-3 bg-pink-100 rounded-lg">
                    {(completedTrades && completedTrades.length > 0) && (
                        completedTrades.map((trade: Trade) => {
                            return (
                                <li>
                                    <TradeInfoBlock 
                                        trade_id={trade.id}
                                        own_user_id={ownUserData?.data.data.id}
                                        listingName={trade?.listing_title ?? "Fix Listing Name"}
                                        listing_id={trade.listing_id}
                                        buyer_id={trade.buyer_id} 
                                        buyer_name={trade?.buyer_name ?? "Fix Buyer Name"}
                                        seller_id={trade.seller_id}
                                        seller_name={trade?.seller_name ?? "Fix Seller Name"}
                                        trade_status={trade.status}
                                        tradePrice={trade.amount} 
                                        updatedAt={trade.updatedAt.toString()}
                                    />
                                </li>
                            )
                        })
                    )}
                </ul>
            </main>
        </div>
    );
}

export default TradesListPage;