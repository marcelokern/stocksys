import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import usersService from "../services/users.service";
import { errorHandler } from "@/lib/error-handler";
import { toast } from "@/components/ui/use-toast";
import { CreateUserType, ListUserType, UserType, UsersListParametersType, UsersProviderType } from "../types/users.types";

const UsersProviderContext = createContext<UsersProviderType>({} as UsersProviderType)

export function UsersProvider({ children }: ContextProviderProps) {

    const [usersList, setUsersList] = useState<ListUserType[]>([] as ListUserType[]);
    const [userData, setUserData] = useState<UserType>({} as UserType);

    const listUsers = async (parameters?: UsersListParametersType) => {

        try {

            const response = await usersService.listUsers(parameters);
            setUsersList(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const getUser = async (id: string) => {

        try {

            const response = await usersService.getUser(id);
            setUserData(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const createUser = async (data: CreateUserType) => {

        try {

            const response = await usersService.createUser(data);
            toast({
                title: 'Senha temporária: ' + response.temporaryPassword,
                description: response.message,
                variant: 'success',
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const updateUser = async (id: string, data: CreateUserType) => {

        try {

            const response = await usersService.updateUser(id, data);
            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const deleteUser = async (id: string) => {

        try {

            const response = await usersService.deleteUser(id);
            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const value = {
        usersList,
        userData,
        listUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser
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