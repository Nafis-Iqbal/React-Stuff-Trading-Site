import { useState, useMemo, useEffect } from "react";
import { ListingApi } from "../../Services/API";
import { listingStatus } from "../../Types&Enums/Enums";
import { CustomCheckboxInput } from "../ElementComponents/CustomInputElements";
import ListingViewBlock from "../ElementComponents/ListingViewBlock";

export const ListingManagerModule = ({className, ownUserId} : {ownUserId: number, className?: string}) => {
    const [status, setStatus] = useState<listingStatus | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
    const [showListings, setShowListings] = useState<boolean>(true);
    const [isFeatured, setIsFeatured] = useState<boolean>(false);

    const { data: allListingsData } = ListingApi.useGetAllListingViewsRQ(true);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleCheckboxChange = (status: listingStatus) => {
        setStatus(prev => (prev === status ? null : status));
    };

    const handleFeaturedFilterChange = () => {
        setIsFeatured(prev => !prev);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filter listings based on debounced search term, status, and featured filter
    const filteredListings = useMemo(() => {
        if (!allListingsData?.data?.data) {
            return [];
        }
        
        const listingsData = allListingsData.data.data;
        
        return listingsData.filter((listing: any) => {
            // Filter by search term (listing title must start with search term)
            const matchesSearch = debouncedSearchTerm === "" || 
                (listing.title && listing.title.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase()));
            
            // Filter by status
            const matchesStatus = status === null || listing.status === status;
            
            // Filter by featured status (only apply filter if isFeatured is true)
            const matchesFeatured = !isFeatured || listing.isFeatured === true;
            
            return matchesSearch && matchesStatus && matchesFeatured;
        });
    }, [allListingsData?.data?.data, debouncedSearchTerm, status, isFeatured]);

    if(!ownUserId) {
        return (
            <div>
                User Id Unavailable
            </div>
        )
    }

    return (
        <div className={`flex flex-col p-2 mx-2 space-y-2 bg-pink-100 rounded-md max-h-screen ${className}`}>
            <h1 className='p-2 text-center text-xl md:text-2xl bg-pink-100 text-pink-800 font-semibold flex-shrink-0'>Listing Manager</h1>

            {/* Listing Filter */}
            <div className="flex flex-col md:flex-row md:w-[100%] space-x-0 md:space-x-5">
                <input 
                    type="text" 
                    placeholder="Search listings..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 text-gray-900 md:w-[35%]
                    focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-md" 
                />

                <div className="flex justify-start md:justify-center space-x-2 md:w-[40%]">
                    <CustomCheckboxInput
                        label="Available"
                        checked={status === "available"}
                        onChange={() => handleCheckboxChange(listingStatus.available)}
                        className="p-2 rounded-xs"
                    />

                    <CustomCheckboxInput
                        label="Pending"
                        checked={status === "pending"}
                        onChange={() => handleCheckboxChange(listingStatus.pending)}
                        className="p-2 rounded-xs"
                    />

                    <CustomCheckboxInput
                        label="Sold"
                        checked={status === "sold"}
                        onChange={() => handleCheckboxChange(listingStatus.sold)}
                        className="p-2 rounded-xs"
                    />

                    <CustomCheckboxInput
                        label="Featured"
                        checked={isFeatured}
                        onChange={handleFeaturedFilterChange}
                        className="p-2 rounded-xs"
                    />
                </div>

                <button className="md:w-[20%] px-2 py-1 bg-emerald-400 hover:bg-emerald-500 text-white rounded-md">Search</button>
            </div>

            {/* Show/Hide Listings Button */}
            <div className="flex justify-end">
                <button 
                    onClick={() => setShowListings(!showListings)}
                    className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-md"
                >
                    {showListings ? 'Hide Listings' : 'Show Listings'}
                </button>
            </div>

            {showListings ? (
                <div className='flex flex-col overflow-y-auto flex-1 pr-2 custom-scrollbar'>
                    {filteredListings?.map((listing: any) => (
                        <ListingViewBlock 
                            key={listing.id}
                            listingId={listing.id}
                            listingTitle={listing.title}
                            description={listing.description}
                            listingLocation={listing.location}
                            listingPhoto={listing?.images[0]?.imageURL ?? "/images/keyboard.jpg"}
                            bidsCount={listing?.bidsCount ?? 0}
                            bestBidderId={listing?.topBid?.bidder_id ?? 0}
                            bestBidUserName={listing?.topBid?.bidder_name ?? "Demo User"}
                            bestBidUserPhoto={listing?.topBid?.bidder_picture ?? "/images/profile_picture.jpg"}
                            bestBidDescription={listing?.topBid?.description ?? "Demo bid"}
                            bestBidPrice={listing?.highestBidPrice ?? 0}
                            isFeatured={listing?.isFeatured ?? false}
                            showAdminControls={true}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-gray-600">
                    <p className="text-lg font-medium">Listings list is hidden</p>
                    <p className="text-sm">Click "Show Listings" to view the listings list</p>
                </div>
            )}
        </div>
    );
};