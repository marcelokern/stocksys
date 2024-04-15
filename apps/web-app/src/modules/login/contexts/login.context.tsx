import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { LoginProviderState } from "../types/login.types";
import loginService from "../services/login.service";
import { errorHandler } from "@/lib/error-handler";
import { LoginFormSchemaType } from "../schemas/login-form.schema";
import { UpdatePasswordFormSchema } from "../schemas/update-password.schema";
import { NavigateFunction } from "react-router-dom";

const LoginProviderContext = createContext<LoginProviderState>({} as LoginProviderState)

export function LoginProvider({ children }: ContextProviderProps) {

    const [userEmail, setUserEmail] = useState<string>('');

    const login = async (data: LoginFormSchemaType) => {

        try {

            const response = await loginService.login(data);
            setUserEmail(data.login);
            localStorage.setItem('@stocksys-token', response.token);
            const decode = JSON.parse(atob(response.token.split('.')[1]));
            return { login: true, passwordCreated: decode.passwordCreated };

        } catch (error: any) {

            errorHandler(error);
            return { login: false };

        }

    }

    const updatePassword = async (data: UpdatePasswordFormSchema) => {

        try {

            await loginService.updatePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
            await login({ login: userEmail, password: data.newPassword });
            return true;

        } catch (error: any) {

            errorHandler(error);
            return false;

        }

    }

    const logout = (navigate: NavigateFunction) => {

        localStorage.removeItem("@stocksys-token");
        navigate('/login');

    }

    const value = { login, updatePassword, logout }

    return (
        <LoginProviderContext.Provider value={value}>
            {children}
        </LoginProviderContext.Provider>
    )

}

export const useLogin = () => {

    return useContext(LoginProviderContext);

}