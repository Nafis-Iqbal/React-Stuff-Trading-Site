import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ListingInfoBlock from "../Components/ElementComponents/ListingInfoBlock";
import ListingDetailModal from "../Components/Modals/ListingDetailModal";
import CreateListingModal from "../Components/Modals/CreateListingModal";

const ListingsListPage:React.FC = () => {
    const [isListingDetailOpen, setIsListingDetailOpen] = useState(false);
    const [listingDetailData, setListingDetailData] = useState<Listing>();

    return (
        <div className="flex flex-1 flex-col md:flex-row bg-pink-100 text-white min-h-screen">
            <div className="md:hidden min-h-[30px] bg-pink-200"></div>

            <main className="flex flex-col w-[100%] md:w-[60%] h-full bg-pink-200">
                <div className="flex justify-between items-center">
                    <h1 className="p-3 md:p-4 ml-2 mt-2 bg-pink-300 text-2xl md:text-3xl text-white font-semibold rounded-sm">Listings</h1>

                    <div className="p-2 md:p-3 mr-2 bg-white text-lg md:text-xl text-emerald-700 border-4 border-emerald-500 font-semibold rounded-md">Own Listings</div>
                </div>

                {isListingDetailOpen && <ListingDetailModal listingData={listingDetailData} onClose={() => setIsListingDetailOpen(false)}/>}
                
                <div className="flex justify-end items-center mt-2">
                    <button className="p-2 m-2 bg-emerald-400 hover:bg-emerald-500 rounded-md">Create Listing</button>
                </div>

                <ul className="p-3 mx-2 my-2 space-y-3 bg-pink-100 rounded-lg">
                    <li>
                        <ListingInfoBlock name="Listing 1" bidsCount={3} onClick={() => setIsListingDetailOpen(true)}/>
                    </li>
                    <li>
                        <ListingInfoBlock name="Listing 1" bidsCount={3} onClick={() => setIsListingDetailOpen(true)}/>
                    </li>
                    <li>
                        <ListingInfoBlock name="Listing 1" bidsCount={3} onClick={() => setIsListingDetailOpen(true)}/>
                    </li>
                </ul>

                <div className="flex justify-end items-center my-2">
                    <button className="p-2 mr-2 bg-emerald-400 hover:bg-emerald-500 rounded-md">Create Listing</button>
                </div>
            </main>
        </div>
    );
}

export default ListingsListPage;