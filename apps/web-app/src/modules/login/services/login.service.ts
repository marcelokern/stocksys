import requester from "@/lib/requester";
import { LoginRequestType, LoginResponseType, UpdatePasswordRequestType, UpdatePasswordResponseType } from "../types/login.types";
import { DefaultResponseType } from "@/modules/global/types/global.types";

const loginService = {

    login: async (data: LoginRequestType) =>
        await requester<LoginRequestType, LoginResponseType>('POST', '/auth', data),

    updatePassword: async (data: UpdatePasswordRequestType) =>
        await requester<UpdatePasswordRequestType, DefaultResponseType>('POST', '/auth/update-password', data)

}

export default loginService;