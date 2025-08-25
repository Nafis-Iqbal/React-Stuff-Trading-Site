import { useState, useMemo, useEffect } from "react";
import { UserApi } from "../../Services/API";
import { role } from "../../Types&Enums/Enums";
import { CustomCheckboxInput } from "../ElementComponents/CustomInputElements";
import { UserViewBlock } from "../ElementComponents/UserViewBlock";

export const UserManagerModule = ({className, ownUserId} : {ownUserId: number, className?: string}) => {
    const [userRole, setUserRole] = useState<role | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

    const { data: allUsersData } = UserApi.useGetAllUsersRQ();

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleCheckboxChange = (role: role) => {
        setUserRole(prev => (prev === role ? null : role));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filter users based on debounced search term and role
    const filteredUsers = useMemo(() => {
        if (!allUsersData?.data?.data) {
            return [];
        }
        
        const usersData = allUsersData.data.data;
        
        return usersData.filter((user: any) => {
            // Filter by search term (user name must start with search term)
            const matchesSearch = debouncedSearchTerm === "" || 
                (user.user_name && user.user_name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase()));
            
            // Filter by role
            const matchesRole = userRole === null || user.role === userRole;
            
            return matchesSearch && matchesRole;
        });
    }, [allUsersData?.data?.data, debouncedSearchTerm, userRole]);

    if(!ownUserId) {
        return (
            <div>
                User Id Unavailable
            </div>
        )
    }

    return (
        <div className={`flex flex-col p-2 mx-2 space-y-2 bg-pink-100 rounded-md max-h-screen ${className}`}>
            <h1 className='p-2 text-center text-xl md:text-2xl bg-pink-100 text-pink-800 font-semibold flex-shrink-0'>User Manager</h1>

            {/* User Filter */}
            <div className="flex flex-col md:flex-row md:w-[100%] space-x-0 md:space-x-5">
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 text-gray-900 md:w-[40%]
                    focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-md" 
                />

                <div className="flex justify-start md:justify-center space-x-2 md:w-[30%]">
                    <CustomCheckboxInput
                        label="Admin"
                        checked={userRole === "admin"}
                        onChange={() => handleCheckboxChange(role.admin)}
                        className="p-2 rounded-xs"
                    />

                    <CustomCheckboxInput
                        label="User"
                        checked={userRole === "user"}
                        onChange={() => handleCheckboxChange(role.user)}
                        className="p-2 rounded-xs"
                    />
                </div>

                <button className="md:w-[20%] px-2 py-1 bg-emerald-400 hover:bg-emerald-500 text-white rounded-md">Search</button>
            </div>

            <div className='flex flex-col overflow-y-auto flex-1 pr-2'>
                {filteredUsers?.map((user: any) => (
                    <UserViewBlock key={user.id} userDetail={user} ownUserId={ownUserId}/>
                ))}
            </div>
        </div>
    );
};



            
                
            