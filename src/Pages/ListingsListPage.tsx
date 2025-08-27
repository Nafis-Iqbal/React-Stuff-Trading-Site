import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { UserApi, ListingApi } from "../Services/API";
import { useGlobalUI } from "../Hooks/StateHooks/GlobalStateHooks";

import ListingInfoBlock from "../Components/ElementComponents/ListingInfoBlock";
import CreateListingModal from "../Components/Modals/CreateListingModal";

const ListingsListPage:React.FC = () => {
    const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
    const [listingsList, setListingsList] = useState<Listing[]>([]);

    const {showListingDetail, showLoadingContent, openNotificationPopUpMessage} = useGlobalUI();

    const { userId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const parsedUserId = Number(userId);

    const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ({});

    // Check if the page was opened with createListing=true query parameter
    useEffect(() => {
        if (searchParams.get('createListing') === 'true') {
            setIsCreateListingOpen(true);
            // Remove the query parameter from URL to clean it up
            setSearchParams((params) => {
                params.delete('createListing');
                return params;
            });
        }
    }, [searchParams, setSearchParams]);

    const {data: listingsListData} = ListingApi.useGetUserListingsRQ(
        parsedUserId,
        () => {
            
        },
        () => {

        },
        (parsedUserId > 0)
    );

    useEffect(() => {
        setListingsList(listingsListData?.data.data);
    }, [listingsListData]);
    
    const onCreateListingSuccess = (formData: Listing) => {
        if(listingsListData)
        {
            setListingsList((prevListings) => [
                ...prevListings,
                {
                    ...formData
                }
            ]);
        }
    }

    const onCreateListingFailure = () => {
        //nothing to do for now
    }

    return (
        <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 text-white min-h-screen">
            <div className="md:hidden min-h-[30px] bg-pink-200"></div>

            {ownUserData?.data.data && (ownUserData.data.data.id === parsedUserId) && 
                <CreateListingModal 
                    isOpen={isCreateListingOpen} 
                    user_id={parsedUserId}
                    onClose={() => setIsCreateListingOpen(false)}
                    onSuccess={onCreateListingSuccess}
                    onFailure={onCreateListingFailure}
                />
            }

            <main className="flex flex-col w-[100%] md:w-[60%] h-full bg-pink-200">
                <div className="flex justify-between items-center">
                    <h1 className="p-3 md:p-4 ml-2 mt-2 text-3xl md:text-4xl text-pink-600 font-semibold rounded-sm">Listings</h1>

                    {ownUserData?.data.data && (ownUserData.data.data.id === parsedUserId) && (<div className="p-2 md:p-3 mr-2 bg-white text-lg md:text-xl text-emerald-700 border-4 border-emerald-500 font-semibold rounded-md">Own Listings</div>)}
                </div>

                {/* {isListingDetailOpen && listingDetailData && <ListingDetailModal listingData={listingDetailData} onClose={() => setIsListingDetailOpen(false)}/>} */}
                
                <div className="flex justify-end items-center mt-2">
                    <button className="p-2 m-2 bg-emerald-400 hover:bg-emerald-500 rounded-md" onClick={() => setIsCreateListingOpen(true)}>Create Listing</button>
                </div>

                <ul className="p-3 mx-2 my-2 space-y-3 bg-pink-100 rounded-lg">
                    {listingsList && listingsList.length > 0 && (listingsList.map(
                        (listing) => {
                            return (
                                <li>
                                    <ListingInfoBlock 
                                        key={listing.id} 
                                        name={listing.title} 
                                        bidsCount={listing.bidsCount ?? 0} 
                                        highestBidPrice={listing.highestBidPrice ?? -1} 
                                        onClick={() => showListingDetail(listing.id)}
                                    />
                                </li>
                            );
                        }
                    ))}
                </ul>
                
                {listingsList && listingsList.length > 5 && (
                    <div className="flex justify-end items-center my-2">
                        <button className="p-2 mr-2 bg-emerald-400 hover:bg-emerald-500 rounded-md" onClick={() => setIsCreateListingOpen(true)}>Create Listing</button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default ListingsListPage;