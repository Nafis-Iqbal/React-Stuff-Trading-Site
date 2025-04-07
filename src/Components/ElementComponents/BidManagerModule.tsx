import { useState, useEffect } from "react";

import { BidApi, ListingApi } from "../../Services/API";
import { isNumber } from "../../Utilities/Utilities";
import { queryClient } from "../../Services/API/ApiInstance";
import { setNotification, setLoading } from "../../GlobalStateContext/CommonPopUpSlice"; 
import { useDispatch } from "react-redux";

import BidViewBlock from "./BidViewBlock";
import LoadingSpinnerBlock from "../LoadingSpinnerBlock";

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

    const {data: bidListData} = ListingApi.useGetListingBidsRQ(
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
                onSuccess(bidFormData);
                queryClient.invalidateQueries(["listings"]);

                setBidFormData({
                    listing_id: listingDetailData?.id ?? 0,
                    description: '',
                    amount: 0,
                    bidder_id: userData?.id ?? 0,
                });
            }
            else{
                onFailure();
            }
        },
        () => {
            onFailure();
        }
    );

    useEffect(() => {
        setBidList(bidListData?.data.data);
    }, [bidListData]);

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

    const handleBidSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createBidMutate(bidFormData);
        setIsSyncingBidSubmission(true);
    }

    const onSuccess = (bidFormData: Bid) => {
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

    const onFailure = () => {
        openNotificationPopUpMessage("Failed to submit bid.");
        setIsSyncingBidSubmission(false);
    };

    const dispatch = useDispatch();

    const showLoadingContent = (setStatus: boolean) => {
        dispatch(setLoading(setStatus));
    }

    const openNotificationPopUpMessage = (notificationMessage: string) => {
        dispatch(setNotification({
            isVisible: true,
            message: notificationMessage,
            type: 'info'
        }))
    }

    return (
        <>
            {/* BIDS MANAGER */}
            <div className="flex flex-col md:w-[35%] flex-1">
                {/* Listing Bids List Section */}
                <div className="flex flex-col p-1 my-2  max-h-fit text-center bg-pink-400 rounded-md">
                    <p className="px-1 py-2 mx-2 my-1 text-lg md:text-xl bg-pink-200 text-pink-700 font-semibold rounded-sm">Bids</p>

                    <ul className="p-1 mx-1 my-1 space-y-1 max-h-[300px] md:max-h-[400px] overflow-y-auto">
                        {(bidList && bidList.length > 0) ? (bidList.map(
                            (bid) => {
                                return (
                                    <li>
                                        <BidViewBlock description={bid.description} amount={bid.amount} bidder_name={bid?.bidder_name ?? "User 1"} bidder_picture="new.jpg"/>
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
                <div className="flex flex-col flex-1 p-1 my-2 max-h-fit justify-start bg-pink-400 rounded-md">
                    <form onSubmit={(e) => handleBidSubmit(e)}>
                        <p className="ml-2 my-2 text-lg md:text-xl font-semibold">Create Bid</p>

                        <div className="flex justify-between mx-2">
                            <textarea
                                id="description"
                                title="description"
                                name="description"
                                value={bidFormData.description}
                                onChange={handleChange}
                                required
                                className="mt-1 px-2 py-1 block w-[65%] h-[70px] md:h-[100px] text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            <button type="submit" className="px-4 py-2 m-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-sm">Bid!</button>

                            <LoadingSpinnerBlock isOpen={isSyncingBidSubmission}/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default BidManagerModule;