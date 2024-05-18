"use client"

import { useQuery } from "react-query";
import { createContext } from "react";
import { api } from "@/lib/api";


type ContextProps = {
    children: React.ReactNode
}


type UserContext = {
    user: User,
    isUserLoading: boolean
}


export const UserContext = createContext<UserContext>({} as UserContext)


const UserContextProvider = ({ children }: ContextProps) => {
    const getUser = async () => {
        const response = await api.get('/user')
        return response.data
    }
    const { data: user, isLoading: isUserLoading } = useQuery('user', getUser, {
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,

    })


    return (
        <UserContext.Provider value={{ user, isUserLoading }}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContextProvider;
 