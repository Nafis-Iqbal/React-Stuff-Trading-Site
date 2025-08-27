import React, {useState, useEffect} from "react";

import { BidApi } from "../Services/API";

import BidInfoBlock from "../Components/ElementComponents/BidInfoBlock";
import { useGlobalUI } from "../Hooks/StateHooks/GlobalStateHooks";

const BidsListPage: React.FC = () => {
    const {showListingDetail} = useGlobalUI();
    const [bidList, setBidList] = useState<Bid[]>();

    const {data: bidListData} = BidApi.useGetUserOwnedBidViewsRQ(
        () => {

        },
        () => {

        },
        true
    );

    useEffect(() => {
        setBidList(bidListData?.data.data);
    }, [bidListData]);

    return (
        <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 text-white min-h-screen">
            <div className="md:hidden min-h-[30px] bg-pink-200"></div>

            <main className="flex flex-col w-[100%] md:w-[60%] h-full bg-pink-200">
                <div className="flex justify-between items-center">
                    <h1 className="p-3 md:p-4 ml-2 mt-2 text-3xl md:text-4xl text-pink-600 font-semibold rounded-sm">Bids</h1>
                </div>

                <ul className="p-3 mx-2 mt-6 mb-2 space-y-3 bg-pink-100 rounded-lg">
                    {bidList && bidList.length > 0 ? (
                        bidList.map((bid) => {
                            return (
                                <li>
                                    <BidInfoBlock 
                                        listingName={bid.listing_name ?? "Fix listing name"} 
                                        description={bid.description} 
                                        bidPrice={bid.amount} 
                                        onViewListingClick={() => showListingDetail(bid.listing_id)}
                                    />
                                </li>
                            );
                        })
                    ) : (
                        <div className="text-pink-700 text-center">You don't have any active bids</div>
                    )
                    }
                </ul>
            </main>
        </div>
    );
};

export default BidsListPage;