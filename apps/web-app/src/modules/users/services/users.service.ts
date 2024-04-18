import requester from "@/lib/requester";
import { DefaultResponseType } from "@/modules/global/types/global.types";
import { CreateUserRequestType, CreateUserResponseType, GetUserReponseType, ListUserResponseType, UsersListParametersType } from "../types/users.types";

const usersService = {

    listUsers: async (parameters?: UsersListParametersType) => {

        let url = '/users';

        if (parameters && parameters.name) {
            url += `?name=${parameters.name}`
        }

        return await requester<undefined, ListUserResponseType>('GET', url);

    },

    getUser: async (id: string) =>
        await requester<undefined, GetUserReponseType>('GET', `/users/${id}`),

    createUser: async (data: CreateUserRequestType) =>
        await requester<CreateUserRequestType, CreateUserResponseType>('POST', '/users', data),

    updateUser: async (id: string, data: CreateUserRequestType) =>
        await requester<CreateUserRequestType, DefaultResponseType>('PUT', `/users/${id}`, data),

    deleteUser: async (id: string) =>
        await requester<undefined, DefaultResponseType>('DELETE', `/users/${id}`),

}

export default usersService;