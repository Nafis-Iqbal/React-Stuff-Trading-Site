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
        const response = await api.delete<ApiResponse<string>>(`listings/delete?id=${listingId}`);
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
        const response = await api.get<ApiResponse<Listing>>(`listings/detail?id=${id}`);
        return response;
    } catch (error) {
        console.log('Error fetching listing detail');
        throw error;
    }
};

export const useGetListingDetailRQ = (id: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryKey: ['listing_detail', id],
        queryFn: () => getListingDetail(id as number),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled
    });
};

// Add Listing Tags
const addListingTags = async (id: number, tagList: number[]): Promise<AxiosResponse> => {
    try {
        const response = await api.post<ApiResponse<string>>("listings/add_tags", { id, tag_list: tagList });
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
        const response = await api.post<ApiResponse<string>>("listings/remove_tags", { id, tag_list: tagList });
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
        const response = await api.get<ApiResponse<Listing[]>>('listings/index');
        return response;
    } catch (error) {
        console.log('Error fetching all listings');
        throw error;
    }
};

export const useGetAllListingsRQ = (onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryKey: ['listings'],
        queryFn: getAllListings,
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled
    });
};

// Get All Listings Views
const getAllListingViews = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Listing[]>>('listings/index_views');
        return response;
    } catch (error) {
        console.log('Error fetching all listings');
        throw error;
    }
};

export const useGetAllListingViewsRQ = (onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryKey: ['listing_views'],
        queryFn: getAllListingViews,
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled
    });
};

// Get User Listings
const getUserListings = async (userId: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Listing[]>>(`listings/user_index?user_id=${userId}`);
      
        return response;
    } catch (error) {
        console.log('Error fetching user listings');
        throw error;
    }
};

export const useGetUserListingsRQ = (userId: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryKey: ['listings', userId],
        queryFn: () => getUserListings(userId),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled: enabled
    });
};

// Get User Owned Listings
const getUserOwnedListings = async (userId: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Listing[]>>(`listings/user_owned_index`);
        return response;
    } catch (error) {
        console.log('Error fetching user owned listings');
        throw error;
    }
};

export const useGetUserOwnedListingsRQ = (userId: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryKey: ['listings', userId],
        queryFn: () => getUserOwnedListings(userId),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled
    });
};

// Get Listing Tags
const getListingTags = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Tag[]>>(`listings/index_tags?id=${id}`);
        return response;
    } catch (error) {
        console.log('Error fetching listing tags');
        throw error;
    }
};

export const useGetListingTagsRQ = (id: number | undefined, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryKey: id ? ['listing_tags', id] : ['listing_tags'],
        queryFn: () => getListingTags(id as number),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled
    });
};

// Get Listing Bids
const getListingBids = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Bid[]>>(`listings/index_bids?id=${id}`);
        return response;
    } catch (error) {
        console.log('Error fetching listing bids');
        throw error;
    }
};

export const useGetListingBidsRQ = (id: number | undefined, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryKey: id ? ['listing_bids', id] : ['listing_bids'],
        queryFn: () => getListingBids(id as number),
        staleTime: 30 * 1000,
        cacheTime: 30 * 1000,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        enabled
    });
};
