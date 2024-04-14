import { ViewPropsType } from "@/modules/global/types/global.types";
import { LoginFormSchemaType } from "../schemas/login-form.schema";
import { SetPasswordFormSchema } from "../schemas/set-password.schema";

type LoginViewStatePropsType = {}

type LoginViewHandlersPropsType = {
    handleAuthenticate: (data: LoginFormSchemaType) => void,
}

export type LoginViewPropsType = ViewPropsType<LoginViewStatePropsType, LoginViewHandlersPropsType>;

type FirstAccessViewStatePropsType = {}

type FirstAccessViewHandlersPropsType = {
    handleSetPassword: (data: SetPasswordFormSchema) => void,
}

export type FirstAccessViewPropsType = ViewPropsType<FirstAccessViewStatePropsType, FirstAccessViewHandlersPropsType>;