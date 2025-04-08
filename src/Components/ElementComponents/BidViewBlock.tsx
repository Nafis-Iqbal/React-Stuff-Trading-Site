import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import BasicButton from "./BasicButton";
import LoadingSpinnerBlock from "../LoadingSpinnerBlock";
import { setListingDetailViewVisibility } from "../../GlobalStateContext/CommonPopUpSlice";

interface BidViewProps{
    description: string;
    amount: number;
    bidder_id: number;
    bidder_name: string;
    bidder_picture: string;
}

const BidViewBlock: React.FC<BidViewProps> = ({
    description,
    amount,
    bidder_id,
    bidder_name,
    bidder_picture
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(
        <div className="flex p-1 space-x-1 bg-pink-100 rounded-sm">
            <div className="flex items-center w-[65%] md:w-[70%]">
                <p className="m-1 text-xl md:text-2xl text-red-500 font-bold">{amount}</p>

                <p className="my-1 mr-1 text-gray-700">{description}</p>
            </div>
            
            <div className="flex justify-between items-center w-[35%] md:w-[30%] mr-1">
                <img className="my-1 mr-1 size-[50px] rounded-full"
                    src={bidder_picture ?? "/images/profile_picture.jpg"} 
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
    );
}

export default BidViewBlock;