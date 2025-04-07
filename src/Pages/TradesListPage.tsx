import React from "react";
import TradeInfoBlock from "../Components/ElementComponents/TradeInfoBlock";

const TradesListPage:React.FC = () => {
    const openListingDetailModal = () => {

    }
    
    return (
        <div className="flex flex-1 flex-col md:flex-row bg-pink-200 md:bg-pink-100 text-white min-h-screen">
            <div className="md:hidden min-h-[30px] bg-pink-200"></div>

            <main className="flex flex-col w-[100%] md:w-[60%] h-full bg-pink-200">
                <div className="flex justify-between items-center">
                    <h1 className="p-3 md:p-4 ml-2 mt-2 bg-pink-300 text-2xl md:text-3xl text-white font-semibold rounded-sm">Trades</h1>

                    <div className="p-2 md:p-3 mr-2 bg-white text-lg md:text-xl text-emerald-700 border-4 border-emerald-500 font-semibold rounded-md">Own Trades</div>
                </div>

                <ul className="p-3 mx-2 mt-6 mb-2 space-y-3 bg-pink-100 rounded-lg">
                    <li>
                        <TradeInfoBlock listingName="Listing 1" buyerName="Big Boy" tradeItems="bid description" tradePrice={40} onViewListingClick={() => openListingDetailModal()}/>
                    </li>
                    <li>
                        <TradeInfoBlock listingName="Listing 2" buyerName="Big Boy2" tradeItems="bid description" tradePrice={40} onViewListingClick={() => openListingDetailModal()}/>
                    </li>
                </ul>
            </main>
        </div>
    );
}

export default TradesListPage;