import React, { useEffect, useState } from "react";

import { ListingApi } from "../Services/API";

import ListingViewBlock from "../Components/ElementComponents/ListingViewBlock";

const DashboardPage:React.FC = () => {
    const images = [
        'images/joystick.jpg',
        'images/keyboard.jpg',
        'images/mouse.jpg',
        'images/sofa.jpg',
    ];

    const [currentBannerImageIndex, setCurrentBannerImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const [listingsList, setListingsList] = useState<Listing[]>([]);

    const {data: listingsListData} = ListingApi.useGetAllListingViewsRQ(
        () => {

        },
        () => {

        },
        true
    );

    useEffect( () => {
        setListingsList(listingsListData?.data.data);
    }, [listingsListData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(true); // Start fade-out
            setTimeout(() => {
              setCurrentBannerImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Change image after fade-out
              setFade(false); // Start fade-in
            }, 750); // Wait 500ms for fade-out to finish before changing the image
          }, 4500); 
      
          return () => clearInterval(intervalId);
    }, [images]);

    useEffect(() => {
        
    }, []);

    return (
        <div className="flex flex-col md:flex-row flex-1 w-[100%] md:w-[80%]">
            {/* Banner Image Section for small screens*/}
            <div className="relative h-[350px] md:hidden py-2 bg-pink-200">
                <img src={images[currentBannerImageIndex]} alt="Mouse" className={`object-cover h-full w-auto absolute transition-opacity duration-500 ease-in-out 
                    ${fade ? 'opacity-0' : 'opacity-100'}`}></img>
                <button className="absolute bottom-3 right-1 p-2 bg-emerald-400 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-sm" disabled>View Listing</button>
            </div>
            
            {/* Main content */}
            <main className="flex flex-col md:w-[70%] mt-3 bg-pink-100 rounded-md">
                {/* Create new listing options */}
                <div className="flex py-4 justify-between bg-pink-200 border-b-4 border-pink-400">
                    <h3 className="p-2 text-xl md:text-2xl mr-10 font-semibold text-gray-700">Got something to trade?</h3>
                    
                    <button className="p-2 mr-1 md:mr-3 bg-emerald-400 hover:bg-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base text-white rounded-sm" disabled>Get Started</button>
                </div>

                {/* Listings browse list */}
                <div className="bg-pink-200 flex flex-1">
                    <div className="flex-1 max-h-[750px] overflow-y-auto p-3 m-3 box-border rounded-md bg-pink-300">
                        <ul className="space-y-4">
                            {listingsList && listingsList.length > 0 && (listingsList.map(
                                (listing) => {
                                    return (
                                        <li>
                                            <ListingViewBlock key={listing.id}
                                                listingTitle = {listing.title}
                                                description = {listing.description}
                                                listingLocation = {listing.location}
                                                listingPhoto = {listing?.listingPicture ?? "images/keyboard.jpg"}
                                                bidsCount = {1}
                                                bestBidUserName = "nafo"
                                                bestBidUserPhoto = "nafo.jpg"
                                                bestBidDescription = "Best bid!"
                                                bestBidPrice = {70}
                                                listingData={listing}
                                            />
                                        </li>
                                    );
                                }
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
            
            {/* Banner Image Section for large screens*/}
            <aside className="hidden md:flex md:flex-col md:w-[30%]  bg-pink-300 rounded-sm border-l-4 border-pink-600">
                <div className="relative h-[50%] bg-pink-200 border-b-4 border-pink-500">
                    <img src={images[currentBannerImageIndex]} alt="some product" className={`object-cover h-full w-auto absolute transition-opacity duration-500 ease-in-out 
                    ${fade ? 'opacity-0' : 'opacity-100'}`}></img>

                    <button className="absolute bottom-3 right-2 p-2 bg-emerald-400 hover:bg-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md" disabled>View Listing</button>
                </div>

                <div className="relative h-[50%] bg-pink-200 border-b-4 border-pink-500">
                    <img src={images[(currentBannerImageIndex + 2) % images.length]} alt="some product" className={`object-cover h-full w-auto absolute transition-opacity duration-500 ease-in-out 
                    ${fade ? 'opacity-0' : 'opacity-100'}`}></img>

                    <button className="absolute bottom-3 right-2 p-2 bg-emerald-400 hover:bg-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md" disabled>View Listing</button>
                </div>
            </aside>
        </div>
    );
}

export default DashboardPage;