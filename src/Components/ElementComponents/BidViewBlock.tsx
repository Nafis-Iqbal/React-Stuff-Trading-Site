import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";
import { BidApi, TradeApi } from "../../Services/API";
import { queryClient } from "../../Services/API/ApiInstance";
import { isNumber } from "../../Utilities/Utilities";

import ConfirmationModal from "../Modals/ConfirmationModal";
import { setListingDetailViewVisibility } from "../../GlobalStateContext/CommonPopUpSlice";
import { listingStatus } from "../../Types&Enums/Enums";

interface BidViewProps{
    id: number;
    description: string;
    amount: number;
    listing_id: number;
    listing_user_id: number;
    listing_status: listingStatus;
    bidder_id: number;
    own_user_id: number;
    bidder_name: string;
    bidder_picture: string;
}

const BidViewBlock: React.FC<BidViewProps> = ({
    id,
    description,
    amount,
    listing_id,
    listing_user_id,
    listing_status,
    bidder_id,
    own_user_id,
    bidder_name,
    bidder_picture
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

    const [isTradeConfirmationVisible, setIsTradeConfirmationVisible] = useState<boolean>(false);
    const [bidFormData, setBidFormData] = useState<Bid>({
        id,
        listing_id,
        description,
        amount,
        bidder_id,
    });

    const {mutate: updateBidMutate} = BidApi.useUpdateBidRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                onBidUpdateSuccess(bidFormData);
                queryClient.invalidateQueries(["listing_bids", listing_id]);
                queryClient.invalidateQueries(["userOwnedBids"]);
                queryClient.invalidateQueries(['listing_views']);
            }
            else{
                onBidUpdateFailure();
            }
        },
        () => {
            onBidUpdateFailure();
        }
    );

    const {mutate: createTradeMutate} = TradeApi.useCreateTradeRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                queryClient.invalidateQueries(["user_trades", own_user_id]);
                queryClient.invalidateQueries(["listing_detail", listing_id]);

                openNotificationPopUpMessage("Trade initiated successfully.");
                showLoadingContent(false);
            }
            else{
                onTradeCreateFailure();
            }
        },
        () => {
            onTradeCreateFailure();
        }
    );

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


    const handleUpdateBidSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        updateBidMutate(bidFormData);
    }

    const onBidUpdateSuccess = (bidFormData: Bid) => {
        openNotificationPopUpMessage("Bid updated successfully.");
    };

    const onBidUpdateFailure = () => {
        openNotificationPopUpMessage("Failed to update bid.");
    };

    const onTradeWithUser = () => {
        createTradeMutate({
            listing_id,
            buyer_id: bidder_id,
            seller_id: own_user_id,
            amount
        });

        showLoadingContent(true);
        setIsTradeConfirmationVisible(false);
    }

    const onTradeCreateFailure = () => {
        showLoadingContent(false);
        openNotificationPopUpMessage("Failed to initiate trade.");
    }

    return(
        <div className="flex flex-col p-1 bg-pink-100 rounded-sm">
            <ConfirmationModal
                isVisible={isTradeConfirmationVisible}
                message="Are you sure you want to trade here?"
                onConfirm={onTradeWithUser}
                onCancel={() => setIsTradeConfirmationVisible(false)}
            />

            <div className="flex space-x-1">
                <div className="flex items-center w-[65%] md:w-[70%]">
                    <p className="m-1 text-xl md:text-2xl text-red-500 font-bold">{amount}</p>

                    <p className="my-1 mr-1 text-gray-700">{description}</p>
                </div>
                
                <div className="flex justify-between items-center w-[35%] md:w-[30%] mr-1">
                    <img className="my-1 mr-1 size-[50px] aspect-square object-cover rounded-full"
                        src={bidder_picture} 
                        alt="userimg"
                    >
                    </img>

                    <button className="p-1 my-1 mr-1 w-[50%] text-pink-700 bg-pink-300 hover:bg-pink-400 rounded-sm" 
                        onClick={() => {
                            navigate(`/profile/${bidder_id ?? 0}`);
                            dispatch(setListingDetailViewVisibility(false));
                        }}
                    >
                        {bidder_name}
                    </button>
                </div>
            </div>
            
            {(bidder_id === own_user_id) && (
                <form className="flex w-full" onSubmit={(e) => handleUpdateBidSubmit(e)}>
                    <div className="flex flex-col w-[70%]">
                        <textarea
                            id="description"
                            title="description"
                            name="description"
                            value={bidFormData.description}
                            onChange={handleChange}
                            required
                            className="mt-1 mr-2 px-2 py-1 block h-[70px] md:h-[100px] resize-none text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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

                    <button 
                        type="submit" 
                        className="w-[30%] max-h-[40px] p-2 my-1 mr-1 text-sm md:text-base text-white bg-emerald-400 hover:bg-emerald-500 rounded-sm
                        disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={listing_status === listingStatus.available ? false : true}
                    >
                            Update Bid
                    </button>
                </form>
            )}

            {(own_user_id === listing_user_id) && (
                <div className="flex justify-end">
                    <button 
                        onClick={() => setIsTradeConfirmationVisible(true)} 
                        className="p-2 m-1 text-white bg-emerald-400 hover:bg-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={listing_status === listingStatus.available ? false : true}
                    >
                        Trade here.
                    </button>
                </div>
            )}
        </div>
    );
}

export default BidViewBlock;