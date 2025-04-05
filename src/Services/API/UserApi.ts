import { useMutation, useQuery } from '@tanstack/react-query';
import api from './ApiInstance';
import { AxiosResponse } from 'axios';

export const createUser = async (user_name: string, email: string, password: string, password_confirmation: string): Promise<AxiosResponse> => {
    try{
        const response = await api.post<ApiResponse<Auth>>("user/create", {
            user_name, email, password, password_confirmation
        });

        return response;
    }
    catch(error)
    {
        console.log("Error creating new user");
        throw error;
    }
}

export const loginUser = async (email: string, password: string): Promise<AxiosResponse> => {
    try{
        const response = await api.post("user/login", {
            email, password
        }, {timeout: 360 * 1000});
        
        return response;
    }
    catch(error)
    {
        console.log("Error logging in.");
        throw error;
    }
}

export const getAuthenticatedUser = async (numbe: number): Promise<AxiosResponse> => {
    try{
        const response = await api.get<ApiResponse<User>>("user");
        
        return response;
    }
    catch(error)
    {
        console.log("Error fetching authenticated user data");
        throw error;
    }
}

export const useGetAuthenticatedUserRQ = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getAuthenticatedUser(1),
        cacheTime: 180 * 1000,
        staleTime: 180 * 1000,
        enabled: true
    });
}

export const fetchUsers = async (): Promise<AxiosResponse> => {
    try{
        const response = await api.get<ApiResponse<User[]>>("user");
        return response;
    }
    catch(error)
    {
        console.log('Error fetching users');
        throw error;
    }
};

export const fetchUser = async (id: number): Promise<AxiosResponse> => {
    try{
        const params = new URLSearchParams({id: id.toString()})
        const response = await api.get<ApiResponse<User>>(`user?${params.toString()}`);
        
        return response;
    }
    catch(error)
    {
        console.log("Error fetching user data");
        throw error;
    }
}

export const useFetchUserRQ = (user_id: number, onSuccessFn: () => void, onErrorFn: () => void) => {
    return useQuery({
        queryKey: ["user", user_id],
        queryFn: () => fetchUser(user_id),
        onSuccess: () => {
            onSuccessFn();
        },
        onError: () => {
            onErrorFn();
        },
        cacheTime: 180 * 1000,
        staleTime: 180 * 1000,
        enabled: true
    });
}

export const updateUser = async (userInfo: User): Promise<AxiosResponse> => {
    try{
        const response = await api.put<ApiResponse<Auth>>("user/update", {
            ...userInfo
        });

        return response;
    }
    catch(error)
    {
        console.log("Error updating user info.");
        throw error;
    }
}

export const useUpdateUserRQ = (onSuccessFn?: (ApiResponse: any) => void, onErrorFn?: () => void) => {
    return useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            if(onSuccessFn)onSuccessFn(data);
        },
        onError: () => {
            if(onErrorFn)onErrorFn();
        }
    });
}