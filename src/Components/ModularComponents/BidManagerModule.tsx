import { useState, useEffect } from "react";

import { BidApi, ListingApi } from "../../Services/API";
import { isNumber } from "../../Utilities/Utilities";
import { queryClient } from "../../Services/API/ApiInstance";
import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";

import BidViewBlock from "../ElementComponents/BidViewBlock";
import LoadingSpinnerBlock from "../PlaceholderComponents/LoadingSpinnerBlock";
import { listingStatus } from "../../Types&Enums/Enums";

interface BidManagerProps{
    listingDetailData: Listing;
    userData: User;
}

const BidManagerModule: React.FC<BidManagerProps> = ({listingDetailData, userData}) => {
    const [bidList, setBidList] = useState<Bid[]>([]);
    const [bidFormData, setBidFormData] = useState<Bid>({
        listing_id: listingDetailData?.id ?? 0,
        description: '',
        amount: 0,
        bidder_id: userData?.id ?? 0,
    });
    const [isSyncingBidSubmission, setIsSyncingBidSubmission] = useState(false);
    const {openNotificationPopUpMessage} = useGlobalUI();

    const {data: bidListData} = ListingApi.useGetListingBidViewsRQ(
        listingDetailData?.id ?? 0,
        () => {

        },
        () => {

        },
        !!listingDetailData?.id
    );

    const {mutate: createBidMutate} = BidApi.useCreateBidRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                onBidCreateSuccess(bidFormData);
                queryClient.invalidateQueries(["listing_bids", listingDetailData?.id ?? 0]);
                queryClient.invalidateQueries(["userOwnedBids"]);

                setBidFormData({
                    listing_id: listingDetailData?.id ?? 0,
                    description: '',
                    amount: 0,
                    bidder_id: userData?.id ?? 0,
                });
            }
            else{
                onBidCreateFailure();
            }
        },
        () => {
            onBidCreateFailure();
        }
    );

    useEffect(() => {
        setBidList(bidListData?.data.data);
        setBidFormData((prevData) => ({
            ...prevData,
            listing_id: listingDetailData?.id ?? 0,
        }));
    }, [bidListData, listingDetailData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let {name, value} = e.target;
        
        if(name === "amount"){
            if(!isNumber(value)){
                value = String(bidFormData.amount);
            }
            else value = value.replace(/^0+/, "");
        }
        
        setBidFormData((prevData) => ({
            ...prevData,
            [name]: name === 'end_date' ? new Date(value) : value,
        }));
    };

    const handleCreateBidSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createBidMutate(bidFormData);
        setIsSyncingBidSubmission(true);
    }

    const onBidCreateSuccess = (bidFormData: Bid) => {
        setIsSyncingBidSubmission(false);

        if(bidListData)
        {
            setBidList((prevBids) => [
                ...prevBids,
                {
                    ...bidFormData
                }
            ]);
        }
    };

    const onBidCreateFailure = () => {
        openNotificationPopUpMessage("Failed to submit bid.");
        setIsSyncingBidSubmission(false);
    };
    
    return (
        <>
            {/* BIDS MANAGER */}
            <div className="flex flex-col flex-1">
                {/* Listing Bids List Section */}
                <div className="flex flex-col p-1 my-2  max-h-fit text-center bg-pink-400 rounded-md">
                    <p className="px-1 py-2 mx-2 my-1 text-lg md:text-xl bg-pink-200 text-pink-700 font-semibold rounded-sm">Bids</p>

                    <ul className="p-1 m-1 space-y-1 max-h-[300px] md:max-h-[400px] overflow-y-auto">
                        {(bidList && bidList.length > 0) ? (bidList.map(
                            (bid) => {
                                return (
                                    <li>
                                        <BidViewBlock 
                                            id={bid?.id ?? 0}
                                            description={bid.description} 
                                            amount={bid.amount} 
                                            listing_id={listingDetailData?.id ?? 0}
                                            listing_user_id={listingDetailData?.user_id ?? 0}
                                            listing_status={listingDetailData?.status}
                                            bidder_id={bid.bidder_id}
                                            own_user_id={userData.id ?? 0}
                                            bidder_name={bid?.bidder_name ?? "User 1"} 
                                            bidder_picture={bid?.bidder_picture ?? "/images/profile_picture.jpg"}
                                        />
                                    </li>
                                );
                            }
                        )) : (
                            <li className="p-2 bg-pink-100 text-pink-700 rounded-sm">
                                No Bids to show
                            </li>
                        )}
                    </ul>
                </div>

                {/* Bids Creation Section*/}
                {(listingDetailData.user_id !== userData.id) && (
                    <div className="flex flex-col flex-1 p-1 my-2 max-h-fit justify-start bg-pink-400 rounded-md">
                        <form onSubmit={(e) => handleCreateBidSubmit(e)}>
                            <p className="ml-2 my-2 text-lg md:text-xl font-semibold text-white">Create Bid</p>

                            <div className="flex justify-between mx-2">
                                <textarea
                                    id="description"
                                    title="description"
                                    name="description"
                                    value={bidFormData.description}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-2 py-1 block w-[65%] h-[70px] md:h-[100px] resize-none text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <input
                                    id="amount"
                                    title="amount"
                                    name="amount"
                                    value={bidFormData.amount}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 px-2 py-2 block w-[30%] h-fit text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div className="flex justify-start space-x-2">
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 m-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-sm"
                                    disabled={listingDetailData?.status === listingStatus.available ? false : true}
                                >
                                    Bid!
                                </button>

                                <LoadingSpinnerBlock isOpen={isSyncingBidSubmission}/>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default BidManagerModule;