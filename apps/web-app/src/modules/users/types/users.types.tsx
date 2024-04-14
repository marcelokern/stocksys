import { ViewPropsType } from "@/modules/global/types/global.types";
import { UserFormSchemaType } from "../schemas/users-form.schema";

export type UserListItemType = {
    id: string;
    registration: string;
    name: string;
    email: string;
    role: string;
    passwordCreated: boolean;
}

export type UserData = {
    id: string;
    registration: string;
    name: string;
    email: string;
    role: string;
    passwordCreated: boolean;
}

export type UsersProviderState = {
    usersList: UserListItemType[],
    userData: UserData
}

type UsersViewStatePropsType = {}

type UsersViewHandlersPropsType = {
    handleSelectUser: (id: string) => void,
    handleListUsers: (filter?: { user: string }) => void,
    handleGetUserData: () => void,
    handleCreateUser: (data: UserFormSchemaType) => void,
    handleUpdateUser: (data: UserFormSchemaType) => void,
    handleRemoveUser: () => void,
}

export type UsersViewPropsType = ViewPropsType<UsersViewStatePropsType, UsersViewHandlersPropsType>;