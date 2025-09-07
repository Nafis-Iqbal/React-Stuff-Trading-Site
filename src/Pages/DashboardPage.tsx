import React, { useEffect, useState, useMemo } from "react";
import { ListingApi, UserApi } from "../Services/API";

import ListingViewBlock from "../Components/ElementComponents/ListingViewBlock";
import { useNavigate } from "react-router-dom";
import { useGlobalUI } from "../Hooks/StateHooks/GlobalStateHooks";

type BannerImageProps = {
    imageUrl: string;
    listingId: number;
}

const DashboardPage:React.FC = () => {
    const navigate = useNavigate();
    
    const [currentBannerImageIndex, setCurrentBannerImageIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const {showListingDetail} = useGlobalUI();

    const {data: ownUserData} = UserApi.useGetAuthenticatedUserRQ({});

    const {data: listingsViewListData} = ListingApi.useGetAllListingViewsRQ(true);

    const listingsViewList = listingsViewListData?.data.data;

    // Create dynamic images array from featured listings
    const images = useMemo((): BannerImageProps[] => {
        if (!listingsViewList) {
            // Fallback to hardcoded images if data is not loaded yet
            return [
                { imageUrl: '/images/joystick.jpg', listingId: 0 },
                { imageUrl: '/images/keyboard.jpg', listingId: 0 },
                { imageUrl: '/images/mouse.jpg', listingId: 0 },
                { imageUrl: '/images/sofa.jpg', listingId: 0 },
            ];
        }

        // Filter featured listings and extract their first image with listing ID
        const featuredListings = listingsViewList.filter((listing: any) => listing.isFeatured === true);
        
        // Get first image and listing ID from each featured listing
        const featuredImages: BannerImageProps[] = featuredListings.map((listing: any) => ({
            imageUrl: listing?.images?.[0]?.imageURL ?? '/images/keyboard.jpg',
            listingId: listing.id ?? 0
        }));

        // Ensure we have at least 4 images for the carousel
        const minimumImages: BannerImageProps[] = [
            { imageUrl: '/images/joystick.jpg', listingId: 0 },
            { imageUrl: '/images/keyboard.jpg', listingId: 0 },
            { imageUrl: '/images/mouse.jpg', listingId: 0 },
            { imageUrl: '/images/sofa.jpg', listingId: 0 },
        ];

        if (featuredImages.length >= 4) {
            return featuredImages.slice(0, 4); // Take first 4 featured images
        } else {
            // If less than 4 featured listings, pad with hardcoded images
            const paddedImages = [...featuredImages];
            while (paddedImages.length < 4) {
                paddedImages.push(minimumImages[paddedImages.length % minimumImages.length]);
            }
            return paddedImages;
        }
    }, [listingsViewList]);

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

    return (
        <div className="flex flex-col md:flex-row flex-1 w-[100%] md:w-[80%]">
            {/* Banner Image Section for small screens*/}
            <div className="relative h-[350px] md:hidden py-2 bg-pink-200">
                <img 
                    src={images[currentBannerImageIndex].imageUrl} 
                    alt="Mouse" 
                    className={`object-cover h-full w-full w-auto absolute transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}
                />

                <button 
                    className="absolute bottom-3 right-1 p-2 bg-emerald-400 hover:bg-emerald-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-sm" 
                    disabled={images[currentBannerImageIndex].listingId === 0}
                    onClick={() => images[currentBannerImageIndex].listingId !== 0 && showListingDetail(images[currentBannerImageIndex].listingId)}
                >
                    View Listing
                </button>
            </div>
            
            {/* Main content */}
            <main className="flex flex-col md:w-[70%] bg-pink-100 rounded-md">
                {/* Create new listing options */}
                <div className="flex py-4 justify-between bg-pink-200 border-b-4 border-pink-400">
                    <h3 className="p-2 text-xl md:text-2xl mr-10 font-semibold text-gray-700">Got something to trade?</h3>
                    
                    <button 
                        className="p-2 mr-1 md:mr-3 bg-emerald-400 hover:bg-emerald-500 text-sm md:text-base text-white
                         disabled:bg-gray-400 disabled:cursor-not-allowed  rounded-sm" 
                        onClick={() => navigate(`/listings/${ownUserData?.data.data.id ?? 0}?createListing=true`)}
                    >
                        Get Started
                    </button>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mx-2">
                    <p className="text-yellow-700 text-sm">
                        <strong>Note:</strong> Product data is demo content to showcase site functionality.
                    </p>
                </div>

                {/* Listings browse list */}
                <div className="bg-pink-200 flex flex-1">
                    <div className="flex-1 md:max-h-[750px] overflow-y-auto p-2 md:p-3 box-border rounded-md custom-scrollbar">
                        <ul className="space-y-4 mb-10">
                            {listingsViewList && listingsViewList.length > 0 && (listingsViewList.map(
                                (listing: any) => {
                                    return (
                                        <li>
                                            <ListingViewBlock key={listing.id}
                                                listingId={listing.id}
                                                listingTitle = {listing.title}
                                                description = {listing.description}
                                                listingLocation = {listing.location}
                                                listingPhoto = {listing?.images[0]?.imageURL ?? "/images/keyboard.jpg"}
                                                bidsCount = {listing?.bidsCount ?? 0}
                                                bestBidderId={listing?.topBid?.bidder_id ?? 0}
                                                bestBidUserName = {listing?.topBid?.bidder_name ?? "Demo User"}
                                                bestBidUserPhoto = {listing?.topBid?.bidder_picture ?? "/images/profile_picture.jpg"}
                                                bestBidDescription = {listing?.topBid?.description ?? "Demo bid"}
                                                bestBidPrice = {listing?.highestBidPrice ?? 0}
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
                    <img 
                        src={images[currentBannerImageIndex].imageUrl} 
                        alt="some product" 
                        className={`object-cover h-full w-full absolute transition-opacity duration-500 ease-in-out 
                            ${fade ? 'opacity-0' : 'opacity-100'}`}
                    />

                    <button 
                        className="absolute bottom-3 right-2 p-2 bg-emerald-400 hover:bg-emerald-500 
                        disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md" 
                        disabled={images[currentBannerImageIndex].listingId === 0}
                        onClick={() => images[currentBannerImageIndex].listingId !== 0 && showListingDetail(images[currentBannerImageIndex].listingId)}
                    >
                        View Listing
                    </button>
                </div>

                <div className="relative h-[50%] bg-pink-200 border-b-4 border-pink-500">
                    <img 
                        src={images[(currentBannerImageIndex + 2) % images.length].imageUrl} 
                        alt="some product" 
                        className={`object-cover h-full w-full absolute transition-opacity duration-500 ease-in-out 
                        ${fade ? 'opacity-0' : 'opacity-100'}`}
                    />

                    <button 
                        className="absolute bottom-3 right-2 p-2 bg-emerald-400 hover:bg-emerald-500 text-white 
                        disabled:bg-gray-400 disabled:cursor-not-allowed  rounded-md" 
                        disabled={images[(currentBannerImageIndex + 2) % images.length].listingId === 0}
                        onClick={() => images[(currentBannerImageIndex + 2) % images.length].listingId !== 0 && showListingDetail(images[(currentBannerImageIndex + 2) % images.length].listingId)}
                    >
                        View Listing
                    </button>
                </div>
            </aside>
        </div>
    );
}

export default DashboardPage;