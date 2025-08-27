import { useMutation, useQuery } from '@tanstack/react-query';
import api from './ApiInstance';
import { AxiosResponse } from 'axios';
import { role } from '../../Types&Enums/Enums';

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

export const getAuthenticatedUser = async (): Promise<AxiosResponse> => {
    try{
        const response = await api.get<ApiResponse<User>>("user/own_detail");
        
        return response;
    }
    catch(error)
    {
        console.log("Error fetching authenticated user data");
        throw error;
    }
}

export const useGetAuthenticatedUserRQ = ({enabled = true}: {enabled?: boolean}) => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getAuthenticatedUser(),
        cacheTime: 180 * 1000,
        staleTime: 180 * 1000,
        enabled
    });
}

export const getAllUsers = async (): Promise<AxiosResponse> => {
    try{
        const response = await api.get<ApiResponse<User[]>>("user/index");

        return response;
    }
    catch(error)
    {
        console.log('Error fetching users');
        throw error;
    }
};

export const useGetAllUsersRQ = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        cacheTime: 180 * 1000,
        staleTime: 180 * 1000,
        enabled: true
    });
}

export const getUserDetail = async (id: number): Promise<AxiosResponse> => {
    try{
        const params = new URLSearchParams({id: id.toString()})
        const response = await api.get<ApiResponse<User>>(`user/detail/?${params.toString()}`);
        
        return response;
    }
    catch(error)
    {
        console.log("Error fetching user data");
        throw error;
    }
}

export const useGetUserDetailRQ = (user_id: number, enabled: boolean) => {
    return useQuery({
        queryKey: ["user", user_id],
        queryFn: () => getUserDetail(user_id),
        cacheTime: 180 * 1000,
        staleTime: 180 * 1000,
        enabled
    });
}

export const updateUser = async (userInfo: {id: number} & Partial<Omit<User, 'id'>>): Promise<AxiosResponse> => {
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

export const updateUserRole = async (user_id: number, role: role): Promise<AxiosResponse> => {
    try{
        const response = await api.put<ApiResponse<Auth>>("user/update/admin-role", {
            user_id, role
        });

        return response;
    }
    catch(error)
    {
        console.log("Error updating user role.");
        throw error;
    }
}

export const useUpdateUserRoleRQ = (onSuccessFn?: (ApiResponse: any) => void, onErrorFn?: () => void) => {
    return useMutation({
        mutationFn: ({ user_id, role }: { user_id: number, role: role }) => updateUserRole(user_id, role),
        onSuccess: (data) => {
            if(onSuccessFn)onSuccessFn(data);
        },
        onError: () => {
            if(onErrorFn)onErrorFn();
        }
    });
}