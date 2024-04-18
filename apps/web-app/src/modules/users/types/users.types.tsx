import { DefaultResponseType, ViewPropsType } from "@/modules/global/types/global.types";
import { createUserFormSchema } from "../schemas/users-form.schema";
import { z } from "zod";

export type ListUserType = {
    id: string;
    registration: string;
    name: string;
    email: string;
    role: string;
    passwordCreated: boolean;
}

export type UserType = {
    id: string;
    registration: string;
    name: string;
    email: string;
    role: string;
    passwordCreated: boolean;
}

export type CreateUserType = {
    registration: string;
    name: string;
    email: string;
    role: string;
}

export type CreateUserFormSchemaType = z.infer<typeof createUserFormSchema>;

export type ListUserResponseType = ListUserType[];

export type GetUserReponseType = UserType;

export type CreateUserRequestType = CreateUserType;

export type CreateUserResponseType = DefaultResponseType & { temporaryPassword: string };

export type UsersProviderType = {
    usersList: ListUserType[],
    userData: UserType,
    listUsers: (parameters?: UsersListParametersType) => Promise<void>,
    getUser: (id: string) => Promise<void>,
    createUser: (data: CreateUserType) => Promise<void>,
    updateUser: (id: string, data: CreateUserType) => Promise<void>,
    deleteUser: (id: string) => Promise<void>,
}

type UsersViewStatePropsType = {}

type UsersViewHandlersPropsType = {
    handleSelectUser: (id: string) => void,
    handleListUsers: (parameters?: UsersListParametersType) => Promise<void>,
    handleGetUserData: (id: string) => Promise<void>,
    handleCreateUser: (data: CreateUserFormSchemaType) => Promise<void>,
    handleUpdateUser: (data: CreateUserFormSchemaType) => Promise<void>,
    handleRemoveUser: () => Promise<void>,
}

export type UsersViewPropsType = ViewPropsType<UsersViewStatePropsType, UsersViewHandlersPropsType>;

export type UsersListParametersType = {
    name: string
}