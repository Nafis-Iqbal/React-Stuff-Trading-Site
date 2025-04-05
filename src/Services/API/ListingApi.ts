import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

// Create Listing
const createListing = async (listing: Listing): Promise<AxiosResponse> => {
    try {
        const response = await api.post<ApiResponse<string>>('listings/create', listing);
        return response;
    } catch (error) {
        console.log('Error creating listing');
        throw error;
    }
};

export const useCreateListingRQ = (onSuccessFn: (data: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: createListing,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Update Listing
const updateListing = async (listing: Listing): Promise<AxiosResponse> => {
    try {
        const response = await api.put<ApiResponse<string>>(`listings/update/${listing.id}`, listing);
        return response;
    } catch (error) {
        console.log('Error updating listing');
        throw error;
    }
};

export const useUpdateListingRQ = (onSuccessFn: (data: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: updateListing,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Delete Listing
const deleteListing = async (listingId: number): Promise<AxiosResponse> => {
    try {
        const response = await api.delete<ApiResponse<string>>(`listings/delete/${listingId}`);
        return response;
    } catch (error) {
        console.log('Error deleting listing');
        throw error;
    }
};

export const useDeleteListingRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: deleteListing,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Get Listing Detail
const getListingDetail = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Listing>>(`listings/detail/${id}`);
        return response;
    } catch (error) {
        console.log('Error fetching listing detail');
        throw error;
    }
};

export const useGetListingDetailRQ = (id: number | undefined, onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: id ? ['listingDetail', id] : ['listingDetail'],
        queryFn: () => getListingDetail(id as number),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Add Listing Tags
const addListingTags = async (id: number, tagList: number[]): Promise<AxiosResponse> => {
    try {
        const response = await api.post<ApiResponse<string>>(`listings/add-tags/${id}`, { tag_list: tagList });
        return response;
    } catch (error) {
        console.log('Error adding tags to listing');
        throw error;
    }
};

export const useAddListingTagsRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: ({id, tagList} : {id: number, tagList: number[]}) => addListingTags(id, tagList),
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Remove Listing Tags
const removeListingTags = async (id: number, tagList: number[]): Promise<AxiosResponse> => {
    try {
        const response = await api.post<ApiResponse<string>>(`listings/remove-tags/${id}`, { tag_list: tagList });
        return response;
    } catch (error) {
        console.log('Error removing tags from listing');
        throw error;
    }
};

export const useRemoveListingTagsRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: ({id, tagList} : {id: number, tagList: number[]}) => removeListingTags(id, tagList),
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Get All Listings
const getAllListings = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Listing[]>>('listings/all');
        return response;
    } catch (error) {
        console.log('Error fetching all listings');
        throw error;
    }
};

export const useGetAllListingsRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: ['allListings'],
        queryFn: getAllListings,
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Get User Listings
const getUserListings = async (userId: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Listing[]>>(`listings/user-listings/${userId}`);
        return response;
    } catch (error) {
        console.log('Error fetching user listings');
        throw error;
    }
};

export const useGetUserListingsRQ = (userId: number, onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: ['userListings', userId],
        queryFn: () => getUserListings(userId),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Get User Owned Listings
const getUserOwnedListings = async (userId: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Listing[]>>(`listings/user-owned-listings/${userId}`);
        return response;
    } catch (error) {
        console.log('Error fetching user owned listings');
        throw error;
    }
};

export const useGetUserOwnedListingsRQ = (userId: number, onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: ['userOwnedListings', userId],
        queryFn: () => getUserOwnedListings(userId),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Get Listing Tags
const getListingTags = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Tag[]>>(`listings/tags/${id}`);
        return response;
    } catch (error) {
        console.log('Error fetching listing tags');
        throw error;
    }
};

export const useGetListingTagsRQ = (id: number | undefined, onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: id ? ['listingTags', id] : ['listingTags'],
        queryFn: () => getListingTags(id as number),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};

// Get Listing Bids
const getListingBids = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Bid[]>>(`listings/bids/${id}`);
        return response;
    } catch (error) {
        console.log('Error fetching listing bids');
        throw error;
    }
};

export const useGetListingBidsRQ = (id: number | undefined, onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: id ? ['listingBids', id] : ['listingBids'],
        queryFn: () => getListingBids(id as number),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
    });
};
