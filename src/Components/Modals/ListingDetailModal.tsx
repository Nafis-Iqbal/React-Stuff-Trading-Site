import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { ListingApi, UserApi } from "../../Services/API";
import { listingStatus } from "../../Types&Enums/Enums";
import makeFirstLetterUppercase from "../../Utilities/Utilities";
import { setListingDetailViewVisibility } from "../../GlobalStateContext/CommonPopUpSlice";
import store from "../../GlobalStateContext/GlobalStateStore";

import { NoContentTableRow } from "../ElementComponents/NoContentDiv";
import BidManagerModule from "../ElementComponents/BidManagerModule";

const ListingDetailModal: React.FC = () => {
    const isOpen = useSelector((state: any) => state.popUps.listingDetailView.isVisible);
    const listingData = useSelector((state: any) => state.popUps.listingDetailView.listingDetail);
    
    const [listingFormData, setListingFormData] = useState<Listing>(listingData);

    const {data: userData} = UserApi.useGetAuthenticatedUserRQ();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let {name, value} = e.target;
        
        setListingFormData((prevData) => ({
            ...prevData,
            [name]: name === 'end_date' ? new Date(value) : value,
        }));
    };

    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(setListingDetailViewVisibility(false));
    }

    useEffect(() => {
        console.log(listingData);
    }, [listingData])

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 -top-4 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
            <div className="flex flex-col bg-pink-200 rounded-lg p-4 m-1 shadow-lg w-[95vw] md:w-[75vw] h-[80vh] md:h-[85vh] overflow-y-auto">
                <div className="flex text-center justify-between bg-pink-300 rounded-md">
                    <div></div>
                    
                    <h2 className="flex text-center justify-center p-2 my-2 bg-pink-300 text-2xl md:text-3xl text-pink-800 font-semibold rounded-md">{listingData?.title}</h2> 
                
                    <button className="p-2 m-3  bg-red-500 hover:bg-red-600 text-white rounded-sm" onClick={() => onCloseModal()}>Close</button>
                </div>         

                <div className="flex flex-col flex-1 md:flex-row w-full h-full">
                    <div className="flex flex-col md:w-[65%]">
                        <img className="p-2 my-2 md:mr-2 h-[70%] bg-gray-600 rounded-md object-contain" src="images/keyboard.jpg" alt="keyb"></img>

                        <div className="flex flex-col p-2 my-2 md:mr-2 bg-pink-300 rounded-md">
                            <div className="flex justify-between items-center p-2">
                                <p className="p-2 my-2 text-lg md:text-xl font-semibold text-pink-700">Listing Status</p>
                                <p className="p-2 mr-2 text-lg md:text-xl font-semibold bg-pink-100 text-emerald-700 rounded-md">{makeFirstLetterUppercase(listingData?.status ?? "N/A")}</p>
                            </div>

                            {listingData.user_id === userData?.data.data.id && (
                                <div className="flex items-center">
                                <p className="p-2 m-2 bg-gray-100 text-base md:text-lg text-pink-700 font-semibold border-2 border-pink-700 rounded-md">Switch Listing Status</p>

                                <select
                                    id="status"
                                    value={listingData?.status}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-[30%] h-fit text-base md:text-lg text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    {Object.values(listingStatus).map((status) => (
                                        <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize */}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            )}
                        </div>
                    </div>
                    
                    {/* BIDS MANAGER */}
                    <BidManagerModule listingDetailData={listingData} userData={userData?.data.data}/>
                </div>
                
            </div>
        </div>
    );
}

export default ListingDetailModal;