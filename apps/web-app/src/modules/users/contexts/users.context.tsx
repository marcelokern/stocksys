import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { UserData, UserListItemType, UsersProviderState } from "../types/users.types";

const UsersProviderContext = createContext<UsersProviderState>({} as UsersProviderState)

export function UsersProvider({ children }: ContextProviderProps) {

    const [usersList, setUsersList] = useState<UserListItemType[]>([]);
    const [userData, setUserData] = useState<UserData>({} as UserData);

    const value = {
        usersList,
        userData
    }

    return (
        <UsersProviderContext.Provider value={value}>
            {children}
        </UsersProviderContext.Provider>
    )
}

export const useUsers = () => {

    return useContext(UsersProviderContext);

}