import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

export const createTag = async (data: { title: string }): Promise<AxiosResponse> => {
    try {
        const response = await api.post<ApiResponse<string>>("tags/create", {
            ...data
        });

        return response;
    }
    catch (error) {
        console.log("Error creating tag");
        throw error;
    }
};

export const useCreateTagRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: createTag,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
};

export const updateTag = async (data: { id: number; title: string }): Promise<AxiosResponse> => {
    try {
        const response = await api.put<ApiResponse<string>>("tags/update", {
            ...data
        });

        return response;
    }
    catch (error) {
        console.log("Error updating tag");
        throw error;
    }
};

export const useUpdateTagRQ = (onSuccessFn: (ApiResponse: any) => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: updateTag,
        onSuccess: (data) => {
            onSuccessFn(data);
        },
        onError: () => {
            onErrorFn();
        }
    });
};

export const deleteTag = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.delete<ApiResponse<string>>(`tags/delete?id=${id}`);

        return response;
    }
    catch (error) {
        console.log("Error deleting tag");
        throw error;
    }
};

export const useDeleteTagRQ = (onSuccessFn: () => void, onErrorFn: () => void) => {
    return useMutation({
        mutationFn: deleteTag,
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        }
    });
};

export const getAllTags = async (): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Tag[]>>("tags/index");

        return response;
    }
    catch (error) {
        console.log("Error fetching all tags");
        throw error;
    }
};

export const useGetAllTagsRQ = (onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: getAllTags,
        queryKey: ["tags"],
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

export const getListingsByTag = async (id: number): Promise<AxiosResponse> => {
    try {
        const response = await api.get<ApiResponse<Listing[]>>(`tags/listings/${id}`);

        return response;
    }
    catch (error) {
        console.log("Error fetching listings by tag");
        throw error;
    }
};

export const useGetListingsByTagRQ = (id: number, onSuccessFn: () => void, onErrorFn: () => void, enabled: boolean) => {
    return useQuery({
        queryFn: () => getListingsByTag(id),
        queryKey: ["listingsByTag", id],
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
