import React, { useEffect, useState } from "react";

import { TradeApi, UserApi } from "../Services/API";
import { useParams } from "react-router-dom";

import TradeInfoBlock from "../Components/ElementComponents/TradeInfoBlock";

const TradesListPage:React.FC = () => {
    const [tradeList, setTradeList] = useState<Trade[]>();

    const { userId } = useParams();
    const parsedUserId = Number(userId);

    const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ();

    const {data: tradeListData} = TradeApi.useGetUserTradeViewsRQ(
        parsedUserId,
        () => {

        },
        () => {

        },
        (parsedUserId > 0)
    );

    useEffect(() => {
        if(tradeListData?.data.data) setTradeList(tradeListData.data.data);
    }, [tradeListData])
    
    return (
        <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 text-white min-h-screen">
            <div className="md:hidden min-h-[30px] bg-pink-200"></div>

            <main className="flex flex-col w-[100%] md:w-[60%] h-full bg-pink-200">
                <div className="flex justify-between items-center">
                    <h1 className="p-3 md:p-4 ml-2 mt-2 bg-pink-300 text-2xl md:text-3xl text-white font-semibold rounded-sm">Trades</h1>

                    <div className="p-2 md:p-3 mr-2 bg-white text-lg md:text-xl text-emerald-700 border-4 border-emerald-500 font-semibold rounded-md">Own Trades</div>
                </div>

                <ul className="p-3 mx-2 mt-6 mb-2 space-y-3 bg-pink-100 rounded-lg">
                    {(tradeList && tradeList.length > 0) && (
                        tradeList.map((trade: Trade) => {
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