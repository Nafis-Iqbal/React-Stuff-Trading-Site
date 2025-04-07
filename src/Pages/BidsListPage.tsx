import React from "react";
import BidInfoBlock from "../Components/ElementComponents/BidInfoBlock";

const BidsListPage: React.FC = () => {
    const openListingDetailModal = () => {

    }

    return (
        <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 text-white min-h-screen">
            <div className="md:hidden min-h-[30px] bg-pink-200"></div>

            <main className="flex flex-col w-[100%] md:w-[60%] h-full bg-pink-200">
                <div className="flex justify-between items-center">
                    <h1 className="p-3 md:p-4 ml-2 mt-2 bg-pink-300 text-2xl md:text-3xl text-white font-semibold rounded-sm">Bids</h1>
                </div>

                <ul className="p-3 mx-2 mt-6 mb-2 space-y-3 bg-pink-100 rounded-lg">
                    <li>
                        <BidInfoBlock listingName="Listing 1" description="bid description" bidPrice={40} onViewListingClick={() => openListingDetailModal()}/>
                    </li>
                    <li>
                        <BidInfoBlock listingName="Listing 2" description="bid description" bidPrice={40} onViewListingClick={() => openListingDetailModal()}/>
                    </li>
                </ul>
            </main>
        </div>
    );
};

export default BidsListPage;