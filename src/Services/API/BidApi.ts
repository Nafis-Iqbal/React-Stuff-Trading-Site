import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

export const getAllBids = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Bid[]>>("bids/index");

        return response;
    }
    catch (error) {
        console.log("Error fetching bids data");
        throw error;
    }
}

export const useGetBidsRQ = (bid_id: number | undefined, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: getAllBids,
        queryKey: bid_id ? ["bids", bid_id] : ["bids"],
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
}

export const createBid = async (bid: Bid): Promise<AxiosResponse> => {
    try {
        const response = api.post<ApiResponse<string>>("bids/create", {
            ...bid
        });

        return response;
    }
    catch (error) {
        console.log("Error creating Bid");
        throw error;
    }
}

export const useCreateBidRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: createBid,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const updateBid = async (bid: Bid): Promise<AxiosResponse> => {
    try {
        const response = api.put<ApiResponse<string>>("bids/update", {
            ...bid
        });

        return response;
    }
    catch (error) {
        console.log("Error updating Bid");
        throw error;
    }
}

export const useUpdateBidRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: updateBid,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const deleteBid = async (bid_id: number): Promise<AxiosResponse> => {
    try {
        const response = api.delete<ApiResponse<string>>(`bids/delete?id=${bid_id}`);

        return response;
    }
    catch (error) {
        console.log("Error deleting bid");
        throw error;
    }
}

export const useDeleteBidRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: deleteBid,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
}

export const getBidDetail = async (bid_id: number): Promise<AxiosResponse> => {
    try {
        const response = api.get<ApiResponse<Bid>>(`bids/detail?id=${bid_id}`);

        return response;
    }
    catch (error) {
        console.log("Error fetching bid details");
        throw error;
    }
}

export const useGetBidDetailRQ = (bid_id: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: () => getBidDetail(bid_id),
        queryKey: ["bidDetail", bid_id],
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
}

export const getUserOwnedBids = async (): Promise<AxiosResponse> => {
    try {
        const response = api.get<ApiResponse<Bid[]>>("bids/user_index");

        return response;
    }
    catch (error) {
        console.log("Error fetching user owned bids");
        throw error;
    }
}

export const useGetUserOwnedBidsRQ = (onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: getUserOwnedBids,
        queryKey: ["userOwnedBids"],
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
}

export const getUserOwnedBidViews = async (): Promise<AxiosResponse> => {
    try {
        const response = api.get<ApiResponse<Bid[]>>("bids/user_index_views");

        return response;
    }
    catch (error) {
        console.log("Error fetching user owned bid views");
        throw error;
    }
}

export const useGetUserOwnedBidViewsRQ = (onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: getUserOwnedBidViews,
        queryKey: ["userOwnedBidViews"],
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
}
