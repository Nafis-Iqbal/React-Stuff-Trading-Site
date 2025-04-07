import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

export const createTrade = async (data: { listing_id: number; buyer_id: number; seller_id: number; amount: number }): Promise<AxiosResponse> => {
    try {
        const response = await api.post<ApiResponse<string>>("trades/create", {
            ...data
        });

        return response;
    }
    catch (error) {
        console.log("Error creating trade");
        throw error;
    }
};

export const useCreateTradeRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: createTrade,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
};

export const updateTrade = async (data: { id: number; amount: number; status: string }): Promise<AxiosResponse> => {
    try {
        const response = await api.put<ApiResponse<string>>("trades/update", {
            ...data
        });

        return response;
    }
    catch (error) {
        console.log("Error updating trade");
        throw error;
    }
};

export const useUpdateTradeRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: updateTrade,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
};

export const getAllTrades = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Trade[]>>("trades");

        return response;
    }
    catch (error) {
        console.log("Error fetching all trades");
        throw error;
    }
};

export const useGetAllTradesRQ = (onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: getAllTrades,
        queryKey: ["trades"],
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

export const getTradeDetail = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Trade>>(`trades/detail/${id}`);

        return response;
    }
    catch (error) {
        console.log("Error fetching trade details");
        throw error;
    }
};

export const useGetTradeDetailRQ = (id: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: () => getTradeDetail(id),
        queryKey: ["tradeDetail", id],
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

export const getUserOwnedTrades = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Trade[]>>("trades/owned");

        return response;
    }
    catch (error) {
        console.log("Error fetching user-owned trades");
        throw error;
    }
};

export const useGetUserOwnedTradesRQ = (onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: getUserOwnedTrades,
        queryKey: ["userOwnedTrades"],
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
