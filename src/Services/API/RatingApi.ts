import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

export const createRating = async (data: {
    listing_id: number;
    trade_id: number;
    rating_taker_id: number;
    rating: number;
    comment: string;
}): Promise<AxiosResponse> => {
    try {
        const response = await api.post<ApiResponse<string>>("ratings/create", {
            ...data
        });

        return response;
    }
    catch (error) {
        console.log("Error creating rating");
        throw error;
    }
};

export const useCreateRatingRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: createRating,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
};

export const updateRating = async (data: {
    id: number;
    rating: number;
    comment: string;
}): Promise<AxiosResponse> => {
    try {
        const response = await api.put<ApiResponse<string>>("ratings/update", {
            ...data
        });

        return response;
    }
    catch (error) {
        console.log("Error updating rating");
        throw error;
    }
};

export const useUpdateRatingRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: updateRating,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
};

export const getAllRatings = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Rating[]>>("ratings");

        return response;
    }
    catch (error) {
        console.log("Error fetching all ratings");
        throw error;
    }
};

export const useGetAllRatingsRQ = (onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: getAllRatings,
        queryKey: ["ratings"],
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

export const getRatingDetail = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Rating>>(`ratings/detail/${id}`);

        return response;
    }
    catch (error) {
        console.log("Error fetching rating detail");
        throw error;
    }
};

export const useGetRatingDetailRQ = (id: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: () => getRatingDetail(id),
        queryKey: ["ratingDetail", id],
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

export const getUserGivenRatings = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Rating[]>>(`ratings/given/${id}`);

        return response;
    }
    catch (error) {
        console.log("Error fetching user given ratings");
        throw error;
    }
};

export const useGetUserGivenRatingsRQ = (id: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: () => getUserGivenRatings(id),
        queryKey: ["userGivenRatings", id],
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

export const getUserAcceptedRatings = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Rating[]>>(`ratings/accepted/${id}`);

        return response;
    }
    catch (error) {
        console.log("Error fetching user accepted ratings");
        throw error;
    }
};

export const useGetUserAcceptedRatingsRQ = (id: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: () => getUserAcceptedRatings(id),
        queryKey: ["userAcceptedRatings", id],
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
