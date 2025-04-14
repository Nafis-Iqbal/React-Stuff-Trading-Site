import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";

import { ListingApi, UserApi } from "../../Services/API";
import { listingStatus } from "../../Types&Enums/Enums";
import makeFirstLetterUppercase from "../../Utilities/Utilities";
import { setListingDetailViewVisibility } from "../../GlobalStateContext/CommonPopUpSlice";
import { queryClient } from "../../Services/API/ApiInstance";
import { useGlobalUI } from "../../Hooks/StateHooks/GlobalStateHooks";

import BidManagerModule from "../ModularComponents/BidManagerModule";
import LoadingSpinnerBlock from "../PlaceholderComponents/LoadingSpinnerBlock";

const ListingDetailModal: React.FC = () => {
    const isOpen = useSelector((state: any) => state.popUps.listingDetailView.isVisible);
    const listingId = useSelector((state: any) => state.popUps.listingDetailView.listingId);
    const {openNotificationPopUpMessage} = useGlobalUI();
    
    const [listingFormData, setListingFormData] = useState<Listing>({
        id: 0,
        user_id: 0,
        title: '',
        description: '',
        location: '',
        exchange_items: '',
        price: 0,
        status: listingStatus.available,
        listingPicture: ''
    });

    const [listingDetail, setListingDetail] = useState<Listing>();
    const [isListingStatusSyncing, setIsListingStatusSyncing] = useState(false);

    const {data: userData} = UserApi.useGetAuthenticatedUserRQ();

    const {data: listingDetailData} = ListingApi.useGetListingDetailRQ(
        listingId,
        () => {

        },
        () => {

        },
        (listingId > 0)
    );

    const {mutate: updateListingMutate} = ListingApi.useUpdateListingRQ(
        (responseData) => {
            if(responseData.data.status === "success")
            {
                onListingUpdateSuccess();
                queryClient.invalidateQueries(["listing_detail", listingId]);
                queryClient.invalidateQueries(["listings"]);
                queryClient.invalidateQueries(["listing_views"]);
            }
            else{
                onListingUpdateFailure();
            }
        },
        () => {
            onListingUpdateFailure();
        }
    );

    useEffect(() => {
        if(listingDetailData?.data.data.length > 0)setListingDetail(listingDetailData?.data.data[0]);

        setListingFormData({
            id: listingDetail?.id ?? 0,
            user_id: listingDetail?.user_id ?? 0,
            title: listingDetail?.title ?? '',
            description: listingDetail?.description ?? '',
            location: listingDetail?.location ?? '',
            exchange_items: listingDetail?.exchange_items ?? '',
            price: listingDetail?.price ?? 0,
            status: listingDetail?.status ?? listingStatus.available,
            listingPicture: listingDetail?.listingPicture ?? ''
        });
    }, [listingDetailData])

    const handleListingStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsListingStatusSyncing(true);
    
        updateListingMutate({
          ...listingFormData,
          status: e.target.value as listingStatus
        } as Listing);
    };

    const onListingUpdateSuccess = () => {
        openNotificationPopUpMessage("Listing updated successfully.");
        setIsListingStatusSyncing(false);
    };

    const onListingUpdateFailure = () => {
        openNotificationPopUpMessage("Failed to update listing.");
        setIsListingStatusSyncing(false);
    };

    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(setListingDetailViewVisibility(false));
    }

    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
            <div className="flex flex-col bg-pink-200 rounded-lg p-4 m-1 shadow-lg w-[95vw] md:w-[75vw] h-[80vh] md:h-[85vh] overflow-y-auto">
                <div className="flex text-center justify-between bg-pink-300 rounded-md">
                    <div></div>
                    
                    <h2 className="flex text-center justify-center p-2 my-2 bg-pink-300 text-2xl md:text-3xl text-pink-800 font-semibold rounded-md">{listingDetail?.title}</h2> 
                
                    <button className="p-2 m-3  bg-red-500 hover:bg-red-600 text-white rounded-sm" onClick={() => onCloseModal()}>Close</button>
                </div>         

                <div className="flex flex-col flex-1 md:flex-row w-full h-full">
                    <div className="flex flex-col md:w-[65%]">
                        <div className="relative flex justify-center items-center p-2 my-2 md:mr-2 h-[70%] bg-gray-600 rounded-md">
                            <img className="max-h-full max-w-full object-contain" src="/images/keyboard.jpg" alt="keyb"></img>
                            {(listingDetail?.user_id === userData?.data.data.id) && (
                                <button className="absolute bottom-1 right-1 bg-emerald-400 hover:bg-emerald-500 text-white py-2 px-4 rounded-sm">Upload photo<span className="text-red-500 font-bold">(Max 3)</span></button>
                            )}
                        </div>

                        <div className="flex flex-col p-2 my-2 md:mr-2 bg-pink-300 rounded-md">
                            <div className="flex justify-between items-center p-2">
                                <p className="p-2 my-2 text-lg md:text-xl font-semibold text-pink-700">Listing Status</p>
                                <p className="p-2 mr-2 text-lg md:text-xl font-semibold bg-pink-100 text-emerald-700 rounded-md">{makeFirstLetterUppercase(listingDetail?.status ?? "N/A")}</p>
                            </div>

                            {listingDetail?.user_id === userData?.data.data.id && (
                                <div className="flex items-center">
                                <p className="p-2 m-2 bg-gray-100 text-base md:text-lg text-pink-700 font-semibold border-2 border-pink-700 rounded-md">Switch Listing Status</p>

                                <select
                                    id="status"
                                    value={listingDetail?.status}
                                    onChange={handleListingStatusChange}
                                    className="mt-1 p-2 block w-[30%] h-fit text-base md:text-lg text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    {Object.values(listingStatus).map((status) => (
                                        <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize */}
                                        </option>
                                    ))}
                                </select>

                                <LoadingSpinnerBlock customStyle="mx-2 size-9" isOpen={isListingStatusSyncing}/>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:w-[35%]">
                        {/* LISTING INFO */}
                        <div className="flex flex-col space-y-1 px-1 pb-2 my-2 bg-pink-400 rounded-md">
                            <div className="flex items-center">
                                <p className="p-1 m-2 text-lg md:text-xl font-semibold text-white">Details</p>
                            </div>
                            
                            <div className="flex flex-col p-2 m-2 space-y-2 bg-pink-200">
                                <p className="text-emerald-700 font-semibold"><span className="text-pink-700 font-bold">Location: </span>{listingDetail?.location ?? ""}</p>

                                <p className="text-gray-700"><span className="text-pink-700 font-bold">Description: </span>{listingDetail?.description ?? ""}</p>

                                <p className="text-gray-700"><span className="text-pink-700 font-bold">Exchange Items: </span>{listingDetail?.exchange_items ?? ""}</p>
                            </div>
                        </div>

                        {/* BIDS MANAGER */}
                        <BidManagerModule listingDetailData={listingDetail ?? listingFormData} userData={userData?.data.data}/>
                    </div>
                </div>
                
            </div>
        </div>
    , document.body);
}

export default ListingDetailModal;