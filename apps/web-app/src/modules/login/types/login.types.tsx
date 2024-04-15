import { ViewPropsType } from "@/modules/global/types/global.types";
import { LoginFormSchemaType } from "../schemas/login-form.schema";
import { UpdatePasswordFormSchema } from "../schemas/update-password.schema";
import { NavigateFunction } from "react-router-dom";

export type LoginRequestType = {
    login: string,
    password: string
}

export type LoginResponseType = {
    token: string
}

export type UpdatePasswordRequestType = {
    currentPassword: string,
    newPassword: string
}

export type UpdatePasswordResponseType = {}

export type LoginProviderState = {
    login: (data: LoginFormSchemaType) => Promise<{ login: boolean, passwordCreated?: boolean }>
    updatePassword: (data: UpdatePasswordFormSchema) => Promise<boolean>
    logout: (navigate: NavigateFunction) => void
}

type LoginViewStatePropsType = {}

type LoginViewHandlersPropsType = {
    handleLogin: (data: LoginFormSchemaType) => Promise<void>,
}

export type LoginViewPropsType = ViewPropsType<LoginViewStatePropsType, LoginViewHandlersPropsType>;

type FirstAccessViewStatePropsType = {}

type FirstAccessViewHandlersPropsType = {
    handleUpdatePassword: (data: UpdatePasswordFormSchema) => Promise<void>,
}

export type FirstAccessViewPropsType = ViewPropsType<FirstAccessViewStatePropsType, FirstAccessViewHandlersPropsType>;